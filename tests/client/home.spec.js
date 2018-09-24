let fs = require('fs');
let jsdom = require("jsdom");
let { JSDOM } = jsdom;
let expect = require('chai').expect;
let { apiReturning, apiFailingWithError } = require('./apis');
let vuejs = fs.readFileSync('server/static/vue-2.5.17.js').toString();
let SUT = fs.readFileSync('server/static/home.js').toString();

describe('home', ()=>{

    let document;
    let component;

    beforeEach(()=>{
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
        component = buildComponent(window, document);
    })

    it('displays fetched message', (done)=>{
        component.fetchData = apiReturning({message:'hello'});
        component.$mount(document.getElementById('app'));
        setTimeout(()=>{
            expect(document.getElementById('message').innerHTML).to.equal('hello');
            done();
        }, 300);
    });

    it('displays error message if any', (done)=>{
        component.fetchData = apiFailingWithError(500, 'stop that!');
        component.$mount(document.getElementById('app'));
        setTimeout(()=>{
            expect(document.getElementById('error').innerHTML).to.equal('500:stop that!');
            done();
        }, 300);
    });

});
