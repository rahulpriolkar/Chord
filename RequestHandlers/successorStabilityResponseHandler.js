const successorStabilityResponseHandler = function (node, params) {
    node.ee.emit('successor-stability-response', params.isStable, params.hopCount);
};

module.exports = successorStabilityResponseHandler;
