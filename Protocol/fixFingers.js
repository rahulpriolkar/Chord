const bigInt = require('big-integer');
const sha1 = require('sha1');

const fixFingers = function () {
    return new Promise((resolve, reject) => {
        const messageId = sha1(Date.now());
        const id = bigInt(this.NODE_ID).add(Math.pow(2, this.fingerIndex)).mod(Math.pow(2, this.FINGER_TABLE_SIZE));

        this.send({
            nextNode: { ip: this.IP_ADDRESS, port: this.PORT, nodeId: this.NODE_ID },
            type: 'find-successor',
            params: {
                startNode: this.getNodeInfo(),
                id,
                hopCount: 0,
                messageId
            }
        });

        const event = `find-successor-response:${messageId}`;
        this.ee.once(event, (successor) => {
            // Don't place oneself in one's own fingerTable
            // (Might happen when the network is small in size compared to FINGER_TABLE_SIZE)
            if (this.NODE_ID.toString() !== successor.nodeId) this.fingerTable[this.fingerIndex] = successor;

            this.fingerIndex = (this.fingerIndex + 1) % this.FINGER_TABLE_SIZE;

            resolve();
        });
    });
};

module.exports = fixFingers;
