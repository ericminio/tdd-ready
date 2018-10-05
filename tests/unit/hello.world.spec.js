import { expect } from 'chai'
import Vue from 'vue'
import axios from 'axios';
import sinon from 'sinon';
import HelloWorld from '@/components/HelloWorld.vue'
import store from '@/store'

describe('HelloWorld.vue', () => {

    let sandbox;
    let component;
    beforeEach(() => {
        sandbox = sinon.createSandbox()
        component = new Vue(HelloWorld)
        component.$store = store
    })
    afterEach(() => sandbox.restore())

    it('sets a default message', () => {
        sandbox.stub(axios, 'get').returns(new Promise((r) => r({})));
        let vm = component.$mount()

        expect(vm.$el.querySelector('#title').textContent).to.equal('loading...')
    })



    it('displays the fetched message', (done) => {
        const resolved = new Promise((resolve) => resolve({ data: { message:'this fetched message'} }));
        sandbox.stub(axios, 'get').returns(resolved);
        let vm = component.$mount()

        setTimeout(() => {
            expect(vm.$el.querySelector('#title').textContent).to.equal('this fetched message')
            done()
        }, 30)
    })

    it('displays error message if any', (done)=>{
        const rejected = new Promise((resolve, reject) => reject('too bad'));
        sandbox.stub(axios, 'get').returns(rejected);
        let vm = component.$mount()

        setTimeout(() => {
            expect(vm.$el.querySelector('#title').textContent).to.equal('too bad')
            done()
        }, 30)
    });
})
