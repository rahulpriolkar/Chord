const predecesorStability = (testNode) => {
    return new Promise(async (resolve) => {
        testNode.send({
            nextNode: testNode.successor,
            type: 'predecessor-stability',
            params: {
                startNode: testNode.getNodeInfo(),
                isStable: true,
                previousNode: testNode.getNodeInfo()
            }
        });

        testNode.ee.once('predecessor-stability-response', (isStable) => {
            resolve(isStable);
        });
    });
};

module.exports = predecesorStability;
