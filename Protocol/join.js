const computeNodeId = require('../utils/computeNodeId');
const logger = require('/home/rahul/Documents/Chord/config/winston');

const join = function ({ ip, port, nodeId = computeNodeId({ ip, port }) }) {
    return new Promise((resolve, reject) => {
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
            this.successor = successor;
            this.predecessor = predecessor;
            logger.log(
                'info',
                `[${this.IP_ADDRESS}:${this.PORT}]-[Received sucessor response!] ${JSON.stringify(this.successor)}`
            );
            resolve();
        });
    });
};

module.exports = join;
