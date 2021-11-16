const bigInt = require('big-integer');
const sha1 = require('sha1');

const stabilize = function () {
    return new Promise((resolve, reject) => {
        const stabilizeCondition = !(this.successor == null || bigInt(this.NODE_ID).eq(bigInt(this.successor.nodeId)));

        if (stabilizeCondition) {
            const messageId = sha1(Date.now());

            this.send({
                nextNode: this.successor,
                type: 'stabilize',
                params: { startNode: this.getNodeInfo(), messageId }
            });

            const event = `stabilize-response:${messageId}`;
            this.ee.once(event, resolve);
        } else {
            resolve();
        }
    });
};

module.exports = stabilize;
