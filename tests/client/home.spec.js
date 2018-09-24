let fs = require('fs');
let jsdom = require("jsdom");
let { JSDOM } = jsdom;
let expect = require('chai').expect;
let { apiReturning } = require('./apis');
let vuejs = fs.readFileSync('server/static/vue-2.5.17.js').toString();

let SUT = fs.readFileSync('server/static/home.js').toString();

describe('home', ()=>{

    let document;
    beforeEach((done)=>{
        let window = new JSDOM('<div id="app"></div>', { runScripts: 'dangerously' }).window;
        document = window.document;
        let wrapper = `
            let buildComponent = function(w, d){
                window = w;
                document = d;
                ` + vuejs + SUT + `
                return hello;
            };
            return buildComponent;
        `;
        let buildComponent = (new Function(wrapper))();
        let component = buildComponent(window, document);
        component.fetchData = apiReturning({message:'hello'});
        component.$mount(document.getElementById('app'));

        setTimeout(()=>{done();}, 300);
    });

    it('displays fetched message', ()=>{
        expect(document.getElementById('message').innerHTML).to.equal('hello');
    });
});
