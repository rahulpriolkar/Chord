const bigInt = require('big-integer');

const notify = function (params) {
    const predecessorCondition =
        this.predecessor == null ||
        (bigInt(params.predecessor.nodeId).lt(bigInt(this.NODE_ID)) &&
            bigInt(params.predecessor.nodeId).gt(bigInt(this.predecessor.nodeId)));

    // console.log(params.predecessor, 'Params predecessor\n');
    if (predecessorCondition) this.predecessor = params.predecessor;
};

module.exports = notify;
