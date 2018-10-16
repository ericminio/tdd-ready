const { expect } = require('chai');
const fs = require('fs');
let digest = (new Function(fs.readFileSync('./static/digest.js').toString() + ' return digest;'))();

describe('digest', ()=>{

    it('builds the data', ()=>{
        let source = `
            one
            two
        `;
        let data = digest(source);

        expect(data).to.deep.equal(['one', 'two']);
    })
})
