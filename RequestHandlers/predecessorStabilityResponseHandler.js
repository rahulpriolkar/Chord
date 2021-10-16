const predecessorStabilityResponseHandler = function (node, params) {
    node.ee.emit('predecessor-stability-response', params.isStable);
};

module.exports = predecessorStabilityResponseHandler;
