const successorStabilityResponseHandler = function (node, params) {
    node.ee.emit('successor-stability-response', params.isStable);
};

module.exports = successorStabilityResponseHandler;
