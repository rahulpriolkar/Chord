const expect = require('chai').expect;
const logger = require('../config/winston');
const app = require('../app');
const simulation = require('../simulation');

describe('Network Stability', () => {
    describe('Routing Table Stability', () => {
        it('should return true if all the nodes have successors with node IDs properly aligned', async function () {
            this.timeout(0); // disabling mocha timeout

            await simulation();
            logger.log('info', 'Simulation Done!');

            const testNode = await app.call(null, {
                ip: '127.0.0.1',
                port: 3001,
                action: 'join',
                params: {
                    ip: '127.0.0.1',
                    port: 3000
                }
            });

            // const hrstart = process.hrtime();

            testNode.send({
                nextNode: testNode.successor,
                type: 'network-stability',
                params: {
                    startNode: testNode.getNodeInfo(),
                    isStable: true,
                    networkViolationCount: 0 // Come up with a better variable name
                }
            });

            const { isStable } = await testNode.receive({ type: 'network-stability-response' });

            // const hrend = process.hrtime(hrstart);
            // console.log(`Execution Time: ${hrend[0]}s ${hrend[1] / 1000000}ms`);

            expect(isStable).is.eql(true);
        });
    });
});
