const bigInt = require('big-integer');
const logger = require('../config/winston');

const predecessorStabiityHandler = (node, params) => {
    const isStartNode = bigInt(node.NODE_ID).compare(bigInt(params.startNode.nodeId)) == 0;

    logger.log('info', `${params.isStable} ${node.PORT} ${node.predecessor.port} ${params.previousNode.port}`);

    if (isStartNode) {
        node.send({
            nextNode: params.startNode,
            type: 'predecessor-stability-response',
            params: params
        });
    } else {
        params.isStable = bigInt(params.previousNode.nodeId).compare(bigInt(node.predecessor.nodeId)) == 0;
        params.previousNode = node.getNodeInfo();

        if (params.isStable) {
            node.send({
                nextNode: node.successor,
                type: 'predecessor-stability',
                params: params
            });
        } else {
            // early exit (network unstable)
            node.send({
                nextNode: params.startNode,
                type: 'predecessor-stability',
                params: params
            });
        }
    }
};

module.exports = predecessorStabiityHandler;
