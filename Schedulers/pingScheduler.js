const ping = require('../Requests/ping');

const pingScheduler = (node, { isArray, target, targetIndex, timeout }) => {
    setInterval(async () => {
        let ip, port;
        if (isArray) {
            ip = node[target][targetIndex].ip;
            port = node[target][targetIndex].port;
        } else {
            ip = node[target].ip;
            port = node[target].port;
        }

        if (ip == undefined || port == undefined) return;

        const targetStatus = await ping({ ip, port, timeout });
        if (!targetStatus) {
            if (isArray) {
                node[target][targetIndex] = null;
            } else {
                node[target] = null;
            }
        }
    }, timeout * 1000);
};

module.exports = pingScheduler;
