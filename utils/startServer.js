const WebSocket = require('ws');
const findSuccessorHandler = require('../RequestHandlers/findSuccessorHandler');
const predecessorAlertHandler = require('../RequestHandlers/predecessorAlertHandler');
const predecessorStabiityHandler = require('../RequestHandlers/predecessorStabilityHandler');
const successorStabilityHandler = require('../RequestHandlers/successorStabilityHandler');

const startServer = function () {
    this.WSS = new WebSocket.Server({ host: this.IP_ADDRESS, port: this.PORT });

    this.WSS.on('connection', (ws, req) => {
        ws.on('message', (message) => {
            message = JSON.parse(message);
            if (message.type == 'find-successor') {
                findSuccessorHandler(this, message.params);
            } else if (message.type == 'predecessor-alert') {
                predecessorAlertHandler(this, message.params);
            } else if (message.type == 'successor-stability') {
                successorStabilityHandler(this, message.params);
            } else if (message.type == 'predecessor-stability') {
                predecessorStabiityHandler(this, message.params);
            }
            ws.close();
        });
    });
};

module.exports = startServer;
