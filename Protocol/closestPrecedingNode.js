const bigInt = require('big-integer');

const isCloser = (node, id, currentDistance) => {
    const newDistance = bigInt(id).subtract(bigInt(node.nodeId));

    return currentDistance === null || newDistance.lt(currentDistance);
};

const closestPrecedingNode = function (id) {
    let nextNode = null,
        currentDistance = null;

    const condition1 = bigInt(id).lt(bigInt(this.NODE_ID));

    for (node of this.fingerTable) {
        if (node === undefined) continue;

        const condition2 = bigInt(node.nodeId).lt(bigInt(this.NODE_ID));

        if ((condition1 && condition2) || (!condition1 && !condition2)) {
            const condition3 = bigInt(node.nodeId).lt(bigInt(id));

            if (condition3) {
                if (nextNode === null || isCloser(node, id, currentDistance)) {
                    nextNode = node;
                    currentDistance = bigInt(id).subtract(bigInt(nextNode.nodeId));
                }
            }
        } else if (condition1 && !condition2) {
            if (nextNode === null || isCloser(node, id, currentDistance)) {
                nextNode = node;
                currentDistance = bigInt(id).subtract(bigInt(nextNode.nodeId));
            }
        } else {
            continue;
        }
    }

    // check with successor
    if (nextNode === null) {
        nextNode = this.successor;
    }

    return nextNode;
};

module.exports = closestPrecedingNode;
