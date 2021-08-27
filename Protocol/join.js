const computeNodeId = require('../utils/computeNodeId');
const logger = require('../config/winston');

const join = function ({ ip, port, nodeId = computeNodeId({ ip, port }) }) {
    return new Promise((resolve, reject) => {
        this.predecessor = null;

        // const hrstart = process.hrtime();

        this.send({
            nextNode: { ip, port, nodeId },
            type: 'find-successor',
            params: {
                startNode: this.getNodeInfo(),
                id: this.NODE_ID,
                hopCount: 0
            }
        });

        this.receive({ type: 'find-successor-response' }).then(({ successor, predecessor, hopCount }) => {
            // console.log(hopCount);
            this.successor = successor;
            this.predecessor = predecessor;
            logger.log(
                'info',
                `[${this.IP_ADDRESS}:${this.PORT}]-[Received sucessor response!] successor:[${this.successor.port}] predecessor: [${this.predecessor.port}]`
            );

            // const hrend = process.hrtime(hrstart);
            // console.log(`Execution Time: ${hrend[0]}s ${hrend[1] / 1000000}ms [${hopCount}]`);

            resolve();
        });
    });
};

module.exports = join;
