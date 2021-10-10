const WebSocket = require('ws');
const findSuccessorHandler = require('../RequestHandlers/findSuccessorHandler');
const stabilizeHandler = require('../RequestHandlers/stabilizeHandler');
const notifyHandler = require('../RequestHandlers/notifyHandler');
const predecessorStabiityHandler = require('../RequestHandlers/predecessorStabilityHandler');
const successorStabilityHandler = require('../RequestHandlers/successorStabilityHandler');
const pingHandler = require('../RequestHandlers/pingHandler');
const fixFingersScheduler = require('../Schedulers/fixFingersScheduler');
const logger = require('../config/winston');

const startServer = function () {
    let count = 0;
    this.WSS = new WebSocket.Server({ host: this.IP_ADDRESS, port: this.PORT });

    this.WSS.on('connection', (ws, req) => {
        // count++;
        ws.on('message', (message) => {
            message = JSON.parse(message);
            console.log(this.PORT, message.type);
            if (message.type == 'find-successor') {
                // if (this.PORT == 3000) logger.log('info', `${this.PORT}, ${message.params}`);
                findSuccessorHandler(this, message.params);
            } else if (message.type == 'stabilize') {
                stabilizeHandler(this, message.params);
            } else if (message.type == 'notify') {
                notifyHandler(this, message.params);
            } else if (message.type == 'successor-stability') {
                successorStabilityHandler(this, message.params);
            } else if (message.type == 'predecessor-stability') {
                predecessorStabiityHandler(this, message.params);
            } else if (message.type == 'ping') {
                pingHandler(ws);
            }
            ws.close();
        });
    });

    setInterval(async () => {
        // logger.log('info', `${this.PORT} ${this.successor.port}`);
        // count++;
        console.log('ITERATION\n');
        console.log(count, this.PORT, this.getNodeInfo(), this.successor, this.predecessor, 'END\n');
        await this.stabilize();
        // if (this.PORT == 3000) await this.fixFingers();
        // fixFingersScheduler(this, 10);
    }, 5 * 1000);
};

module.exports = startServer;
