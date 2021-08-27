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

        const { isStable } = await testNode.receive({ type: 'predecessor-stability-response' });

        resolve(isStable);
    });
};

module.exports = predecesorStability;
