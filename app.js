const Node = require('./models/node');

const app = function (message) {
    const nodeObj = new Node(message.ip, message.port);

    for (method of message.methods) {
        nodeObj[method.name](method.params);
    }
};

module.exports = app;
