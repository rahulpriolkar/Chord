const bigInt = require('big-integer');

const stabilizeResponseHandler = function (node, params) {
    const predecessor = params.predecessor;

    const isLastNode = node.successor && bigInt(node.NODE_ID).gt(bigInt(node.successor.nodeId));

    const condition1 = predecessor && bigInt(predecessor.nodeId).gt(bigInt(node.NODE_ID));
    const condition2 = predecessor && bigInt(predecessor.nodeId).lt(bigInt(node.successor.nodeId));
    const successorCondition = isLastNode ? condition1 || condition2 : condition1 && condition2;

    if (successorCondition) node.successor = predecessor;

    node.send({
        nextNode: node.successor,
        type: 'notify',
        params: { predecessor: node.getNodeInfo() }
    });

    node.ee.emit('stabilize-response');
};

module.exports = stabilizeResponseHandler;
