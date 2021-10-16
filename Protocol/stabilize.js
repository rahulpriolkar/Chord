const bigInt = require('big-integer');

const stabilize = function () {
    return new Promise((resolve, reject) => {
        const stabilizeCondition = !(this.successor == null || bigInt(this.NODE_ID).eq(bigInt(this.successor.nodeId)));

        if (stabilizeCondition) {
            this.send({
                nextNode: this.successor,
                type: 'stabilize',
                params: { startNode: this.getNodeInfo() }
            });

            this.ee.once('stabilize-response', resolve);
        } else {
            resolve();
        }
    });
};

module.exports = stabilize;
