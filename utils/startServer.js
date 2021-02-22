const WebSocket = require('ws');

const startServer = function () {
    this.WSS = new WebSocket.Server({ host: this.IP_ADDRESS, port: this.PORT });

    this.WSS.on('connection', (ws, req) => {
        ws.on('message', (message) => {
            message = JSON.parse(message);
            if (message.type == 'find-successor') {
                this.findSuccessor(message.params);
            }
        });
    });
};

module.exports = startServer;
