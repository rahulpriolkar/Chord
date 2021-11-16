const WebSocket = require('ws');
const findSuccessorHandler = require('../RequestHandlers/findSuccessorHandler');
const stabilizeHandler = require('../RequestHandlers/stabilizeHandler');
const notifyHandler = require('../RequestHandlers/notifyHandler');
const predecessorStabiityHandler = require('../RequestHandlers/predecessorStabilityHandler');
const successorStabilityHandler = require('../RequestHandlers/successorStabilityHandler');
const pingHandler = require('../RequestHandlers/pingHandler');
const fixFingersScheduler = require('../Schedulers/fixFingersScheduler');
const findSuccessorResponseHandler = require('../RequestHandlers/findSuccessorResponseHandler');
const stabilizeResponseHandler = require('../RequestHandlers/stabilizeResponseHandler');
const predecessorStabilityResponseHandler = require('../RequestHandlers/predecessorStabilityResponseHandler');
const successorStabilityResponseHandler = require('../RequestHandlers/successorStabilityResponseHandler');

const startServer = function () {
    this.WSS = new WebSocket.Server({ host: this.IP_ADDRESS, port: this.PORT });

    this.WSS.on('connection', (ws, req) => {
        ws.on('message', (message) => {
            message = JSON.parse(message);

            // console.log(this.PORT, message.type);

            const { type, params } = message;
            // console.log(type, params);

            switch (type) {
                case 'find-successor':
                    findSuccessorHandler(this, params);
                    break;

                case 'find-successor-response':
                    findSuccessorResponseHandler(this, params);
                    break;

                case 'stabilize':
                    stabilizeHandler(this, params);
                    break;

                case 'stabilize-response':
                    stabilizeResponseHandler(this, params);
                    break;

                case 'notify':
                    notifyHandler(this, params);
                    break;

                case 'successor-stability':
                    successorStabilityHandler(this, params);
                    break;

                case 'successor-stability-response':
                    successorStabilityResponseHandler(this, params);
                    break;

                case 'predecessor-stability':
                    predecessorStabiityHandler(this, params);
                    break;

                case 'predecessor-stability-response':
                    predecessorStabilityResponseHandler(this, params);
                    break;

                case 'ping':
                    pingHandler(ws);
                    break;

                default:
                    console.log('Invalid Request!');
            }
            ws.close();
        });
    });

    setInterval(async () => {
        const s = this.successor ? this.successor.port : null;
        const p = this.predecessor ? this.predecessor.port : null;
        // console.log(this.successor.port, this.fingerTable[0].port);
        console.log(this.PORT, s, p, 'END');
        await this.stabilize();
    }, 3 * 1000);

    fixFingersScheduler(this, 10);
};

module.exports = startServer;
