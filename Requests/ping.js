const WebSocket = require('ws');

const ping = ({ ip, port, timeout }) => {
    return new Promise((resolve, reject) => {
        const URL = `ws://${ip}:${port}`;
        const ws = new WebSocket(URL);

        let isActive = null;
        ws.on('open', () => {
            ws.send(JSON.stringify({ type: 'ping' }));

            let timer = setTimeout(() => {
                if (isActive == null) isActive = false;
                resolve(isActive);
            }, timeout * 1000); // timeout is in seconds, converted to milliseconds

            ws.on('message', (message) => {
                message = JSON.parse(message);
                if (message.type == 'pong') {
                    isActive = true;
                }
                clearTimeout(timer);
            });
        });

        ws.on('error', () => {
            isActive = false;
        });

        ws.on('close', () => {
            resolve(isActive);
        });
    });
};

module.exports = ping;
