module.exports = (api) => {
    return JSON.stringify(api, function(key, value) {
        if (typeof value === 'function') {
            return value.toString();
        } else {
            return value;
        }
    });
}
