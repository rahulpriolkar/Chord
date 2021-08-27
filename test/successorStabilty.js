const succcessorStability = (testNode) => {
    return new Promise(async (resolve) => {
        testNode.send({
            nextNode: testNode.successor,
            type: 'successor-stability',
            params: {
                startNode: testNode.getNodeInfo(),
                isStable: true,
                networkViolationCount: 0 // Come up with a better variable name
            }
        });

        const { isStable } = await testNode.receive({ type: 'successor-stability-response' });

        resolve(isStable);
    });
};

module.exports = succcessorStability;
