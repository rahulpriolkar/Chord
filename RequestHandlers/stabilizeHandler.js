const stabilizeHandler = function (node, params) {
    node.send({ nextNode: params.startNode, type: 'stabilize-response', params: { predecessor: node.predecessor } });
};

module.exports = stabilizeHandler;
