const expect = require('chai').expect;
const logger = require('../config/winston');
const app = require('../app');
// const simulation = require('../simulation');
const succcessorStability = require('./successorStabilty');
const predecessorStability = require('./predecessorStability');
const delay = require('../utils/delay');

describe('Network Stability', () => {
    let testNode;

    it('Simulating a network', async function () {
        this.timeout(0);

        // await simulation();

        console.log('test node joining');
        testNode = await app.call(null, {
            ip: '127.0.0.1',
            port: 3001,
            action: 'join',
            params: {
                ip: '127.0.0.1',
                port: 3000
            }
        });
    });

    describe('Routing Table Stability', async () => {
        before(async function () {
            this.timeout(0); // disabling mocha timeout
            console.log('Running delay');
            await delay(9);
            console.log('Running test 2,3');
        });
        it('should return true if all the nodes have successors with node IDs properly aligned', async function () {
            this.timeout(0); // disabling mocha timeout

            const isStable = await succcessorStability(testNode);

            expect(isStable).is.eql(true);
        });

        it('should return true if all the nodes have predecessors with node IDs properly aligned', async function () {
            this.timeout(0); // disabling mocha timeout

            const isStable = await predecessorStability(testNode);

            expect(isStable).is.eql(true);
        });
    });
});
