const Node = require('./models/node');
const display = require('./utils/display');

const app = (message) => {
    return new Promise(async (resolve, reject) => {
        const nodeObj = new Node(message.ip, message.port);

        nodeObj.startServer();

        if (message.action == 'create') {
            nodeObj.create();
            resolve(nodeObj);
        } else if (message.action == 'join') {
            await nodeObj.join(message.params);
            resolve(nodeObj);
        }
    });
};

module.exports = app;
