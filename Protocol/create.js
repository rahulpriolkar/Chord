const create = function () {
    this.predecessor = this.getNodeInfo();
    this.successor = this.getNodeInfo();
};

module.exports = create;
