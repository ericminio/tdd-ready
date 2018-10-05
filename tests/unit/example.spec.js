import { expect } from 'chai'
import Vue from 'vue'
import axios from 'axios';
import sinon from 'sinon';
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {

    it('sets a default message', () => {
        expect(HelloWorld.data().message).to.equal('loading...')
    })

    let sandbox;
    beforeEach(() => sandbox = sinon.createSandbox())
    afterEach(() => sandbox.restore())

    it('displays the fetched message', (done) => {
        const resolved = new Promise((resolve) => resolve({ data: { message:'this fetched message'} }));
        sandbox.stub(axios, 'get').returns(resolved);
        const vm = new Vue(HelloWorld).$mount()

        setTimeout(() => {
            expect(vm.$el.querySelector('#title').textContent).to.equal('this fetched message')
            done()
        }, 30)
    })

    it('displays error message if any', (done)=>{
        const rejected = new Promise((resolve, reject) => reject('too bad'));
        sandbox.stub(axios, 'get').returns(rejected);
        const vm = new Vue(HelloWorld).$mount()

        setTimeout(() => {
            expect(vm.$el.querySelector('#title').textContent).to.equal('too bad')
            done()
        }, 30)
    });
})
