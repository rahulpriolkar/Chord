const delay = (t) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t * 1000);
    });
};

module.exports = delay;
