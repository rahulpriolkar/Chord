const bigInt = require('big-integer');

const fixFingers = function () {
    return new Promise((resolve, reject) => {
        this.send({
            nextNode: { ip: this.IP_ADDRESS, port: this.PORT, nodeId: this.NODE_ID },
            type: 'find-successor',
            params: {
                startNode: this.getNodeInfo(),
                id: bigInt(this.NODE_ID).add(Math.pow(2, this.fingerIndex)),
                hopCount: 0
            }
        });

        if (this.PORT == 3000) console.log('fix-mid');

        this.receive({ type: 'find-successor-response' }).then(({ successor, predecessor, hopCount }) => {
            this.fingerTable[this.fingerIndex] = successor;
            this.fingerIndex = (this.fingerIndex + 1) % this.FINGER_TABLE_SIZE;
            console.log('end-fix');
            resolve();
        });
    });
};

module.exports = fixFingers;
