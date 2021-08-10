const bigInt = require('big-integer');
const logger = require('../config/winston');

const networkStabilityHandler = (node, params) => {
    const isCurrentNode = bigInt(node.NODE_ID).compare(bigInt(params.startNode.nodeId));

    if (isCurrentNode == 0) {
        if (params.isStable) {
            // Checking the successor condition for the startNode, after a round trip around the network
            const condition1 = params.networkViolationCount == 0 && bigInt(node.NODE_ID).compare(bigInt(node.successor.nodeId)) == 1;
            const condition2 = params.networkViolationCount == 1 && bigInt(node.NODE_ID).compare(bigInt(node.successor.nodeId)) == -1;
            if (!condition1 && !condition2) {
                params.isStable = false;
            }
        }
        node.send({
            nextNode: params.startNode,
            type: 'network-stability-response',
            params: params
        });
    } else {
        if (bigInt(node.NODE_ID).compare(bigInt(node.successor.nodeId)) === -1) {
            node.send({
                nextNode: node.successor,
                type: 'network-stability',
                params: params
            });
        } else if (params.networkViolationCount == 0) {
            // one-time exception when crossing the network boundary { node(n-1) -> node(0) }
            params.networkViolationCount++;
            node.send({
                nextNode: node.successor,
                type: 'network-stability',
                params: params
            });
        } else {
            // early exit (network unstable)
            params.isStable = false;
            node.send({
                nextNode: params.startNode,
                type: 'network-stability',
                params: params
            });
        }
    }
};

module.exports = networkStabilityHandler;
