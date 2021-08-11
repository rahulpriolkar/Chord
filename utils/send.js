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

    // ws.on('close', () => {
    //     console.log('connection closed!');
    // });
};

module.exports = send;
