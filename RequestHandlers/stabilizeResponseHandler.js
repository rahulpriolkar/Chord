const bigInt = require('big-integer');

const stabilizeResponseHandler = function (node, params) {
    const predecessor = params.predecessor;

    const successorCondition =
        predecessor && bigInt(predecessor.nodeId).gt(bigInt(node.NODE_ID)) && bigInt(predecessor.nodeId).lt(bigInt(node.successor.nodeId));

    if (successorCondition) node.successor = predecessor;

    node.send({
        nextNode: { ip: node.successor.ip, port: node.successor.port, nodeId: node.successor.nodeId },
        type: 'notify',
        params: { predecessor: node.getNodeInfo() }
    });

    this.ee.emit('stablize-response');
};

module.exports = stabilizeResponseHandler;
