const app = require('./app');

setTimeout(
    app.bind(null, {
        ip: '127.0.0.1',
        port: 3000,
        methods: [
            { name: 'startServer', params: {} },
            { name: 'create', params: {} }
        ]
    }),
    1000 * 1
);
setTimeout(
    app.bind(null, {
        ip: '127.0.0.1',
        port: 3001,
        methods: [
            { name: 'startServer', params: {} },
            { name: 'join', params: { ip: '127.0.0.1', port: 3000 } }
        ]
    }),
    1000 * 2
);
setTimeout(
    app.bind(null, {
        ip: '127.0.0.1',
        port: 3002,
        methods: [
            { name: 'startServer', params: {} },
            { name: 'join', params: { ip: '127.0.0.1', port: 3001 } }
        ]
    }),
    1000 * 3
);
