const { expect } = require('chai');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let extend = (new Function(fs.readFileSync('./static/play.js').toString() + ' return extend;'))();

describe('extension', ()=>{

    it('adds the what', ()=>{
        var document = new JSDOM(`
            <html>
                <body>
                    <input id="what" value="this extension" />
                </body>
            </html>
        `).window.document;
        var data = {};
        extend(data, document);

        expect(data.extension).to.equal('this extension');
    })
})
