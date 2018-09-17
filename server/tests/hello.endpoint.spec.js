import { expect } from 'chai';
let request = require('request');
let server = require('../server');
let home = 'http://localhost:' + server.port;
server.start(()=>{
    console.log('Listening on port', server.port);
});
let { execute } = require('yop-postgresql');

describe('/hello', ()=>{

    it('returns the first message', (done)=>{
        let statements = [
            'truncate table message',
            { sql:'insert into message(content) values ($1)', params:['hello'] },
            { sql:'insert into message(content) values ($1)', params:['world'] }
        ];
        execute(statements, (rows, error) => {
            request(home + '/hello', (error, response, body)=>{
                expect(error).to.equal(null);
                expect(response.statusCode).to.equal(200);
                expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
                expect(JSON.parse(body)).to.deep.equal({ message:{content:'hello'} });
                done();
            });
        });
    });
});
