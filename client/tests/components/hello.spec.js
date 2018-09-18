import { mount, expect } from '../support/enzyme.setup';
import { apiReturning, apiFailingWithError } from '../support/apis';
import React from 'react';
import Hello from '../../src/components/Hello';

describe('Hello', ()=> {

    it('displays fetched greetings', (done)=>{
        let document = mount(<Hello
            fetchMessage={apiReturning({ message:{content:'good job!'} })}
        />);
        setTimeout(()=>{
            let field = document.find('#greetings');

            expect(field.text()).to.equal('good job!');
            done();
        }, 150);
    });

    it('displays the error when an error occurs', (done)=>{
        let document = mount(<Hello
            fetchMessage={apiFailingWithError('expected')}
        />);
        setTimeout(()=>{
            let field = document.find('#error');

            expect(field.text()).to.equal('expected');
            done();
        }, 150);
    });
});
