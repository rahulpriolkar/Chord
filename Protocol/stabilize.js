const bigInt = require('big-integer');

const stabilize = function () {
    return new Promise((resolve, reject) => {
        const stabilizeCondition = !(this.successor == null || bigInt(this.NODE_ID).eq(bigInt(this.successor.nodeId)));

        if (stabilizeCondition) {
            this.send({
                nextNode: { ip: this.successor.ip, port: this.successor.port, nodeId: this.successor.nodeId },
                type: 'stabilize',
                params: { startNode: this.getNodeInfo() }
            });

            this.ee.on('find-successor-response', () => {
                resolve();
            });
        } else {
            resolve();
        }
    });
};

module.exports = stabilize;
