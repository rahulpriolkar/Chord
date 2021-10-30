const findSuccessorResponseHandler = function (node, params) {
    const event = `find-successor-response:${params.messageId}`;
    node.ee.emit(event, params.successor, params.hopCount);
};

module.exports = findSuccessorResponseHandler;
