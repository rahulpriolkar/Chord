const create = function () {
    this.predecessor = null;
    this.successor = this.getNodeInfo();
};

module.exports = create;
