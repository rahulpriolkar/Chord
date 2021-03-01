const logger = require('../config/winston');

const display = function (obj, time) {
    setInterval(() => {
        logger.log('verbose', `[${obj.IP_ADDRESS}:${obj.PORT}]-[DISPLAY] ${JSON.stringify(obj.successor)}`);
    }, time);
};

module.exports = display;
