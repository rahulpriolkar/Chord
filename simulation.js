const app = require('./app');
const isPortFree = require('./utils/isPortFree');
const fs = require('fs');

// empties the log file content.
fs.truncate('./logs/app.log', 0, () => {});

const simulation = () => {
    return new Promise(async (resolve, reject) => {
        const hrstart = process.hrtime();

        await app.call(null, {
            ip: '127.0.0.1',
            port: 3000,
            action: 'create',
            params: {}
        });

        let ipAddress, port;
        for (let i = 49152; i < 49154; i++) {
            ipAddress = `127.0.0.2`;
            port = i;

            // skip if the port is not free
            const isFree = await isPortFree(i);
            // console.log(`${i}, ${isFree}`);
            if (!isFree) continue;

            console.log('[Simulation]', i);

            await app.call(null, {
                ip: ipAddress,
                port: port,
                action: 'join',
                params: {
                    ip: '127.0.0.1',
                    port: 3000
                }
            });
        }

        const hrend = process.hrtime(hrstart);
        console.log(`Execution Time: ${hrend[0]}s ${hrend[1] / 1000000}ms`);

        resolve();
    });
};

(async () => {
    console.log('Start');
    await simulation();
    console.log('End');
})();

module.exports = simulation;
