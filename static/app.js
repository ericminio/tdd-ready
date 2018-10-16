let digest = function(quote) {
     return quote.split('\n');
};
let extractGreetings = function(data) {
    return data[2];
}
let display = function(greetings, document) {
    document.getElementById('greetings').innerHTML = greetings;
}

if (typeof module == 'object') {
    module.exports = {
        digest:digest
    };
};
