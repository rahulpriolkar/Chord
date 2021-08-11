const getNodeInfo = function () {
    return {
        ip: this.IP_ADDRESS,
        port: this.PORT,
        nodeId: this.NODE_ID
    };
};

module.exports = getNodeInfo;
