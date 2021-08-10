const net = require('net');

const isPortFree = (port) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer((socket) => {
            // socket.write('Echo server\r\n');
            socket.pipe(socket);
        });

        server.listen(port, '127.0.0.1');

        server.on('error', (e) => {
            resolve(false);
        });
        server.on('listening', (e) => {
            server.close();
            resolve(true);
        });
    });
};

module.exports = isPortFree;
