const expect = require('chai').expect;
const app = require('../app');
const simulation = require('../simulation');

describe('Network Stability', () => {
    describe('Routing Table Stability', () => {
        it('should return true if all the nodes have successors with node IDs properly aligned', async function () {
            this.timeout(0); // disabling mocha timeout

            await simulation();

            const testNode = await app.call(null, {
                ip: '127.0.0.1',
                port: 3001,
                action: 'join',
                params: {
                    ip: '127.0.0.1',
                    port: 3000
                }
            });

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
            expect(isStable).is.eql(true);
        });
    });
});
