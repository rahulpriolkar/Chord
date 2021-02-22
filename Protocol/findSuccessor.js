const bigInteger = require('big-integer');

const findSuccessor = function ({ startNode, id }) {
    id = bigInteger(id);

    const isLastNode = this.NODE_ID > this.successor.nodeId;
    const isOnlyNode = this.NODE_ID == this.successor.nodeId;

    let successorCondition = isLastNode
        ? id <= this.successor.nodeId
        : id > this.NODE_ID && id <= this.successor.nodeId;

    // special case for only one node in the network.
    if (isOnlyNode) successorCondition = true;

    if (successorCondition) {
        this.send({
            nextNode: startNode,
            type: 'find-successor-response',
            params: {
                successor: this.successor,
                predecessor: this.getNodeInfo()
            }
        });
        this.successor = startNode;
        if (this.predecessor == null) this.predecessor = startNode; // WARNING TEST THIS LINE
        console.log(`\n\n[${this.IP_ADDRESS}:${this.PORT}]`);
        console.log('successor update!', this.successor, this.predecessor);
    } else {
        // The line below to be replaced with O(log n) look-up equivalent.
        const nextNode = this.successor;

        this.send({
            nextNode,
            type: 'find-successor',
            params: {
                startNode,
                id
            }
        });
    }
};

module.exports = findSuccessor;
