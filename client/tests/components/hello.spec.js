require('../support/enzyme.setup');
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { apiReturning, apiFailingWithError } from '../support/apis';
import Hello from '../../src/components/Hello';

describe('Hello', ()=> {

    it('displays fetched greetings', (done)=>{
        let document = mount(<Hello
            fetchMessage={apiReturning({ message:{content:'good job!'} })}
        />);
        setTimeout(()=>{
            let field = document.find('#greetings').at(0);

            expect(field.text()).to.equal('good job!');
            done();
        }, 150);
    });

    it('displays the error when an error occurs', (done)=>{
        let document = mount(<Hello
            fetchMessage={apiFailingWithError('expected')}
        />);
        setTimeout(()=>{
            let field = document.find('#error').at(0);

            expect(field.text()).to.equal('expected');
            done();
        }, 150);
    });
});
