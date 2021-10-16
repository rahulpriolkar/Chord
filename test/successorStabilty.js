const succcessorStability = (testNode) => {
    return new Promise(async (resolve) => {
        testNode.send({
            nextNode: testNode.successor,
            type: 'successor-stability',
            params: {
                startNode: testNode.getNodeInfo(),
                isStable: true,
                hopCount: 0,
                networkViolationCount: 0 // Come up with a better variable name
            }
        });

        testNode.ee.once('successor-stability-response', (isStable, hopCount) => {
            console.log('Hop Count', hopCount);
            resolve(isStable);
        });
    });
};

module.exports = succcessorStability;
