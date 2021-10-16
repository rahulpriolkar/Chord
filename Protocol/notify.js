const bigInt = require('big-integer');

const notify = function (params) {
    const { predecessor } = params; // predecessor will never be null

    const isLastNode = this.predecessor && bigInt(this.predecessor.nodeId).gt(bigInt(this.NODE_ID));

    const condition1 = bigInt(predecessor.nodeId).lt(bigInt(this.NODE_ID));
    const condition2 = this.predecessor && bigInt(predecessor.nodeId).gt(bigInt(this.predecessor.nodeId));

    const predecessorCondition = this.predecessor == null || (isLastNode ? condition1 || condition2 : condition1 && condition2);

    if (predecessorCondition) this.predecessor = params.predecessor;
};

module.exports = notify;
