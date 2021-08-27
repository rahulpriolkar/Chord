const pingHandler = (ws) => {
    // * Timers cannot be used here *
    // Because ws.close() will be called in the next phase of
    // the event loop, closing the connection and the timer function
    // will face a broken connection
    ws.send(JSON.stringify({ type: 'pong' }));
};

module.exports = pingHandler;
