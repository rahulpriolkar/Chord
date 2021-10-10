const fixFingersScheduler = (node, time) => {
    setInterval(async () => {
        await node.fixFingers();
        if (node.PORT == 3000) console.log(node.fingerIndex);
    }, time * 1000);
};

module.exports = fixFingersScheduler;
