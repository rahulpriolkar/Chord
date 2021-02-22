const computeNodeId = require('../utils/computeNodeId');

const join = function ({ ip, port, nodeId = computeNodeId({ ip, port }) }) {
    this.predecessor = null;

    this.send({
        nextNode: { ip, port, nodeId },
        type: 'find-successor',
        params: {
            startNode: this.getNodeInfo(),
            id: this.NODE_ID
        }
    });
    this.receive({ type: 'find-successor-response' }).then(({ successor, predecessor }) => {
        console.log(`\n\n[${this.IP_ADDRESS}:${this.PORT}]`);
        console.log('Received sucessor response!');
        this.successor = successor;
        this.predecessor = predecessor;
        console.log(this.successor, this.predecessor);
    });
};

module.exports = join;
