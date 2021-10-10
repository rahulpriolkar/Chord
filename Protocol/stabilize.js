const bigInt = require('big-integer');

const stabilize = function () {
    return new Promise((resolve, reject) => {
        this.send({
            nextNode: { ip: this.successor.ip, port: this.successor.port, nodeId: this.successor.nodeId },
            type: 'stabilize',
            params: { startNode: this.getNodeInfo() }
        });

        this.receive({ type: 'stabilize-response' }).then(({ ws, predecessor }) => {
            const successorCondition =
                bigInt(predecessor.nodeId).gt(bigInt(this.NODE_ID)) && bigInt(predecessor.nodeId).lt(bigInt(this.successor.nodeId));

            if (successorCondition) this.successor = predecessor;

            this.send({
                nextNode: { ip: this.successor.ip, port: this.successor.port, nodeId: this.successor.nodeId },
                type: 'notify',
                params: { predecessor: this.getNodeInfo() }
            });

            resolve();
        });
    });
};

module.exports = stabilize;
