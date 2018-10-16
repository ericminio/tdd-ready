const { expect } = require('chai');
const fs = require('fs');
let extractGreetings = (new Function(fs.readFileSync('./static/play.js').toString() + ' return extractGreetings;'))();

describe('play', ()=>{

    it('selects the second line', ()=>{
        let data = [
            'first',
            'second'
        ];
        let greetings = extractGreetings(data);

        expect(greetings).to.equal('second');
    })
})
