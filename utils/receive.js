const receive = function ({ type }) {
    return new Promise((resolve, reject) => {
        this.WSS.on('connection', (ws, req) => {
            ws.on('message', (message) => {
                message = JSON.parse(message);
                if (message.type == type) {
                    resolve(message.params);
                }
            });
        });
    });
};

module.exports = receive;
