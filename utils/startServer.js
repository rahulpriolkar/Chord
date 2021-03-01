const WebSocket = require('ws');
const findSuccessorHandler = require('../RequestHandlers/findSuccessorHandler');
const networkStabilityHandler = require('../RequestHandlers/networkStabilityHandler');

const startServer = function () {
    this.WSS = new WebSocket.Server({ host: this.IP_ADDRESS, port: this.PORT });

    this.WSS.on('connection', (ws, req) => {
        ws.on('message', (message) => {
            message = JSON.parse(message);
            if (message.type == 'find-successor') {
                findSuccessorHandler(this, message.params);
            } else if (message.type == 'network-stability') {
                networkStabilityHandler(this, message.params);
            }
        });
    });
};

module.exports = startServer;
