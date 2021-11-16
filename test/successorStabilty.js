const sha1 = require('sha1');

const succcessorStability = (testNode) => {
    return new Promise(async (resolve) => {
        const messageId = sha1(Date.now());

        testNode.send({
            nextNode: testNode.successor,
            type: 'successor-stability',
            params: {
                startNode: testNode.getNodeInfo(),
                isStable: true,
                hopCount: 0,
                messageId,
                networkViolationCount: 0 // Come up with a better variable name
            }
        });

        const event = `successor-stability-response:${messageId}`;
        testNode.ee.once(event, (isStable, hopCount) => {
            console.log('Hop Count', hopCount);
            resolve(isStable);
        });
    });
};

module.exports = succcessorStability;
