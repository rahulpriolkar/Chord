const receive = function ({ type }) {
    return new Promise((resolve, reject) => {
        this.WSS.on('connection', (ws, req) => {
            ws.addEventListener('message', (message) => {
                message = JSON.parse(message.data);
                console.log(this.PORT, type, message.type, 'type\n');
                if (message.type == type) {
                    // this.WSS.removeEventListener('connection');
                    ws.close();
                    message.params.ws = ws;
                    resolve(message.params);
                }
            });
        });
    });
};

module.exports = receive;
