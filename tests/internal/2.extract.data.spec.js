const { expect } = require('chai');
const fs = require('fs');
let extractDataFrom = (new Function(fs.readFileSync('./static/play.js').toString() + ' return extractDataFrom;'))();

describe('extractDataFrom', ()=>{

    it('selects the second line', ()=>{
        let source = [
            'first',
            'second'
        ];
        let data = extractDataFrom(source);

        expect(data.greetings).to.equal('second');
    })
})
