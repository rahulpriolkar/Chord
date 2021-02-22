const send = require('../utils/send');
const receive = require('../utils/receive');
const getNodeInfo = require('../utils/getNodeInfo');
const computeNodeId = require('../utils/computeNodeId');
const startServer = require('../utils/startServer');
const findSuccessor = require('../Protocol/findSuccessor');
const create = require('../Protocol/create');
const join = require('../Protocol/join');

const Node = class {
    constructor(IP_ADDRESS = '127.0.0.1', PORT = 3000) {
        this.IP_ADDRESS = IP_ADDRESS;
        this.PORT = PORT;
        this.NODE_ID = computeNodeId({ ip: this.IP_ADDRESS, port: this.PORT });
        // this.fingerTable = [];
        // this.fingerIndex = 0;
    }

    getNodeInfo = getNodeInfo;
    send = send;
    receive = receive;
    startServer = startServer;
    findSuccessor = findSuccessor;
    create = create;
    join = join;
};

module.exports = Node;
