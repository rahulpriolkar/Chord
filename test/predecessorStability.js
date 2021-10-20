const sha1 = require('sha1');

const predecesorStability = (testNode) => {
    return new Promise(async (resolve) => {
        const messageId = sha1(Date.now());

        testNode.send({
            nextNode: testNode.successor,
            type: 'predecessor-stability',
            params: {
                startNode: testNode.getNodeInfo(),
                isStable: true,
                previousNode: testNode.getNodeInfo(),
                messageId
            }
        });

        const event = `predecessor-stability-response:${messageId}`;
        testNode.ee.once(event, (isStable) => {
            resolve(isStable);
        });
    });
};

module.exports = predecesorStability;
