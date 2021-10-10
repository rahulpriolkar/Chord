const bigInt = require('big-integer');

const findSuccessor = function ({ startNode, id, hopCount }) {
    id = bigInt(id);

    const isLastNode = bigInt(this.NODE_ID).gt(bigInt(this.successor.nodeId));
    const isOnlyNode = bigInt(this.NODE_ID).eq(bigInt(this.successor.nodeId));

    let successorCondition = isLastNode
        ? id.gt(bigInt(this.NODE_ID)) || id.leq(bigInt(this.successor.nodeId))
        : id.gt(bigInt(this.NODE_ID)) && id.leq(bigInt(this.successor.nodeId));

    // special case for only one node in the network.
    if (isOnlyNode) successorCondition = true;

    console.log(successorCondition);

    hopCount++;
    if (successorCondition) {
        this.send({
            nextNode: startNode,
            type: 'find-successor-response',
            params: {
                successor: this.successor,
                hopCount
            }
        });
    } else {
        // The line below to be replaced with O(log n) look-up equivalent.
        const nextNode = this.successor;

        this.send({
            nextNode,
            type: 'find-successor',
            params: {
                startNode,
                id,
                hopCount
            }
        });
    }
};

module.exports = findSuccessor;
