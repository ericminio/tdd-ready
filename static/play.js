let extractDataFrom = function(source) {
    return { greetings:source[1] };
}
let extend = function(data, document) {
    data.extension = document.getElementById('what').value;
    return data;
}
