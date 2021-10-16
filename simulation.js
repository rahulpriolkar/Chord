const app = require('./app');
const isPortFree = require('./utils/isPortFree');
const fs = require('fs');

// empties the log file content.
fs.truncate('./logs/app.log', 0, () => {});

const simulation = () => {
    return new Promise(async (resolve, reject) => {
        const hrstart = process.hrtime();

        console.log('Creating the network');
        await app.call(null, {
            ip: '127.0.0.1',
            port: 3000,
            action: 'create',
            params: {}
        });

        let ports = [];
        for (let i = 49152; i < 49226; i++) {
            ports.push(i);
        }
        // randomzing the join sequence
        ports = ports.sort((a, b) => 0.5 - Math.random());

        console.log(ports);

        let ipAddress = '127.0.0.2';
        for (const port of ports) {
            // skip if the port is not free
            const isFree = await isPortFree(port);
            if (!isFree) continue;

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
    console.log('Start Simulation');
    await simulation();
    console.log('End Simulation');
})();

module.exports = simulation;
