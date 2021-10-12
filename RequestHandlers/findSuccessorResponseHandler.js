const findSuccessorResponseHandler = function (node, params) {
    node.successor = params.successor;
    node.ee.emit('find-successor-response');
};

module.exports = findSuccessorResponseHandler;
