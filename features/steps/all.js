const {
    BeforeAll,
    Given,
    When,
    Then
} = require('cucumber');
const Browser = require('zombie');
const browser = new Browser();
let {
    execute
} = require('yop-postgresql');

let server;

BeforeAll((done) => {
    server = require('../../server/server');
    server.start(() => {
        console.log('Listening on port', server.port);
        done();
    });
});

Given('Database is clean', (done) => {
    let statements = [
        'truncate table message'
    ]
    execute(statements, [], (rows, error) => {
        done();
    });
});

Given('Database is seeded with message {string}', (value, done) => {
    execute('insert into message(content) values ($1)', [value], (rows, error) => {
        done(error);
    })
});

When('I access the home page', (done) => {
    browser.visit('http://localhost:' + server.port, () => {
        setTimeout(() => {
            done();
        }, 300);
    });
});

Then('I see the greetings {string}', (message) => {
    browser.assert.text('#greetings', message);
});

Then('I see no error', () => {
    browser.assert.text('#error', '');
});
