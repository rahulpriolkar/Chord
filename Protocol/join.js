const computeNodeId = require('../utils/computeNodeId');

const join = function ({ ip, port, nodeId = computeNodeId({ ip, port }) }) {
    return new Promise((resolve, reject) => {
        this.predecessor = null;

        this.send({
            nextNode: { ip, port, nodeId },
            type: 'find-successor',
            params: {
                startNode: this.getNodeInfo(),
                id: this.NODE_ID,
                hopCount: 0
            }
        });

        this.receive({ type: 'find-successor-response' }).then(({ successor }) => {
            this.successor = successor;
            resolve();
        });
    });
};

module.exports = join;
