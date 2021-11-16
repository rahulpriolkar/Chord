const successorStabilityResponseHandler = function (node, params) {
    const event = `successor-stability-response:${params.messageId}`;
    node.ee.emit(event, params.isStable, params.hopCount);
};

module.exports = successorStabilityResponseHandler;
