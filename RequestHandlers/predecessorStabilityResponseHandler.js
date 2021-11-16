const predecessorStabilityResponseHandler = function (node, params) {
    const event = `predecessor-stability-response:${params.messageId}`;
    node.ee.emit(event, params.isStable);
};

module.exports = predecessorStabilityResponseHandler;
