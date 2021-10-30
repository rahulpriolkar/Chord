const send = require('../utils/send');
const getNodeInfo = require('../utils/getNodeInfo');
const computeNodeId = require('../utils/computeNodeId');
const startServer = require('../utils/startServer');
const findSuccessor = require('../Protocol/findSuccessor');
const closestPrecedingNode = require('../Protocol/closestPrecedingNode');
const create = require('../Protocol/create');
const join = require('../Protocol/join');
const fixFingers = require('../Protocol/fixFingers');
const stabilize = require('../Protocol/stabilize');
const notify = require('../Protocol/notify');

const { EventEmitter } = require('events').EventEmitter;

const Node = class {
    constructor(IP_ADDRESS = '127.0.0.1', PORT = 3000) {
        this.IP_ADDRESS = IP_ADDRESS;
        this.PORT = PORT;
        this.FINGER_TABLE_SIZE = 14;
        this.fingerTable = new Array(this.FINGER_TABLE_SIZE);
        this.fingerIndex = 0;
        this.NODE_ID = computeNodeId({ ip: this.IP_ADDRESS, port: this.PORT, m: this.FINGER_TABLE_SIZE });
        console.log(this.PORT, this.NODE_ID);
        this.predecessor = null;
        this.successor = null;
        this.ee = new EventEmitter();
    }

    getNodeInfo = getNodeInfo;
    send = send;
    startServer = startServer;
    findSuccessor = findSuccessor;
    closestPrecedingNode = closestPrecedingNode;
    create = create;
    join = join;
    fixFingers = fixFingers;
    stabilize = stabilize;
    notify = notify;
};

module.exports = Node;
