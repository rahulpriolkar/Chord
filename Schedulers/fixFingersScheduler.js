const fixFingersScheduler = (node, time) => {
    setInterval(async () => {
        await node.fixFingers();
        // if (node.PORT == 49153) console.log(node.fingerTable);
    }, time * 1000);
};

module.exports = fixFingersScheduler;
