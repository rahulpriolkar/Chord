const sha1 = require('sha1');
const bigInt = require('big-integer');

const computeNodeId = function ({ ip, port, m }) {
    const NODE_ADDR = `${ip}:${port}`;
    return bigInt(sha1(NODE_ADDR), 16).mod(Math.pow(2, m));
};

module.exports = computeNodeId;
