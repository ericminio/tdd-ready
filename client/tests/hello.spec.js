require('./support/enzyme.setup');

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Hello from '../src/components/Hello';
import { Promise } from 'yop-promises';

describe('Hello', ()=> {

    let createDocument = ()=>{
        let document = mount(<Hello
            fetchMessage={ ()=> {
                var p = new Promise();
                setTimeout(()=>{
                    p.resolve({ message:{content:'good job!'} });
                }, 200);
                return p;
            }}
        />);
        return document;
    };
    let document;
    beforeEach((done)=>{
        document = createDocument();

        setTimeout(()=>{ done(); }, 300);
    });

    it('display fetched greetings', ()=>{
        let field = document.find('#greetings').at(0);

        expect(field.text()).to.equal('good job!');
    });

});
