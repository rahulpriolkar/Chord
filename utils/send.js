const WebSocket = require('ws');

const send = function ({ nextNode, type, params }) {
    const ws = new WebSocket(`ws://${nextNode.ip}:${nextNode.port}`);
    ws.on('open', () => {
        ws.send(
            JSON.stringify({
                type,
                params
            })
        );
    });
};

module.exports = send;
