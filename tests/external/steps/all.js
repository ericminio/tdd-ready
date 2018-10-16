const {
    Before,
    After,
    Given,
    When,
    Then
} = require('cucumber');
const Browser = require('zombie');
const browser = new Browser();
const fs = require('fs');
let LocalServer = require('../../support/local.server');

let server;
Before((done)=>{
    server = new LocalServer({
        '/': fs.readFileSync('./index.html').toString(),
    });
    server.start(()=>{
        browser.visit('http://localhost:' + server.port, done);
    });
});
After((done)=>{
    if (server) {server.stop(done);}
    else { done(); }
});

Given('the inspiring quote:', function (value) {
    server.handler['/static/quote.js'] = 'let quote=`\n'+ value + '\n`;'
});
When('I access the home page', (done) => {
    browser.visit('http://localhost:' + server.port, done);
});
When('I enter the additional input {string}', function (value, done) {
    browser.fill('#what', value);
    browser.click('#go', done);
});

Then('I see the greetings {string}', (message) => {
    browser.assert.text('#greetings', message);
});
