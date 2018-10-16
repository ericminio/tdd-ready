let digest = function(quote) {
    return quote.split('\n')
        .map(line => line.trim())
        .filter(line => line.length>0 );
};
