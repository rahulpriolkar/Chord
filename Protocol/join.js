const computeNodeId = require('../utils/computeNodeId');
const sha1 = require('sha1');

const join = function ({ ip, port }) {
    return new Promise((resolve, reject) => {
        this.predecessor = null;

        const messageId = sha1(Date.now());

        const nodeId = computeNodeId({ ip, port, m: this.FINGER_TABLE_SIZE });

        this.send({
            nextNode: { ip, port, nodeId },
            type: 'find-successor',
            params: {
                startNode: this.getNodeInfo(),
                id: this.NODE_ID,
                hopCount: 0,
                messageId
            }
        });

        const event = `find-successor-response:${messageId}`;
        this.ee.once(event, (successor) => {
            this.successor = successor;
            resolve();
        });
    });
};

module.exports = join;
