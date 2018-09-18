require('../support/enzyme.setup');
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { apiReturning, apiFailingWithError } from '../support/apis';
import Hello from '../../src/components/Hello';

describe('Hello', ()=> {

    let document;

    describe('when message is available', ()=>{

        beforeEach((done)=>{
            document = mount(<Hello
                fetchMessage={apiReturning({ message:{content:'good job!'} })}
            />);

            setTimeout(()=>{ done(); }, 150);
        });

        it('displays fetched greetings', ()=>{
            let field = document.find('#greetings').at(0);

            expect(field.text()).to.equal('good job!');
        });
    });

    describe('when an error occurs', ()=>{

        beforeEach((done)=>{
            document = mount(<Hello
                fetchMessage={apiFailingWithError('expected') }
            />);

            setTimeout(()=>{ done(); }, 150);
        });

        it('displays the error', ()=>{
            let field = document.find('#error').at(0);

            expect(field.text()).to.equal('expected');
        });
    });
});
