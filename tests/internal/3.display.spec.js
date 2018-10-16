const { expect } = require('chai');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let display = (new Function(fs.readFileSync('./static/render.js').toString() + ' return display;'))();

describe('display', ()=>{

    it('sets greetings', ()=>{
        var document = new JSDOM(`<html><body><div id="greetings"></div></body></html>`).window.document;
        display('hello', document);

        expect(document.getElementById('greetings').innerHTML).to.equal('hello');
    })
})
