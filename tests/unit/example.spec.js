import { expect } from 'chai'
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { apiReturning, apiFailingWithError } from './support/apis'

describe('HelloWorld.vue', () => {

    it('sets a default message', () => {
        expect(HelloWorld.data().message).to.equal('loading...')
    })

    it('fetches the message to be displayed', (done) => {
        let component = new Vue(HelloWorld)
        component.fetchData = apiReturning({message:'Hello Vue'})
        const vm = component.$mount()

        setTimeout(() => {
            expect(vm.message).to.equal('Hello Vue')
            done()
        }, 300)
    })

    it('displays the fetched message', (done) => {
        let component = new Vue(HelloWorld)
        component.fetchData = apiReturning({message:'this fetched message'})
        const vm = component.$mount()

        setTimeout(() => {
            expect(vm.$el.querySelector('#title').textContent).to.equal('this fetched message')
            done()
        }, 300)
    })

    it('displays error message if any', (done)=>{
        let component = new Vue(HelloWorld)
        component.fetchData = apiFailingWithError(500, 'stop that!')
        const vm = component.$mount()

        setTimeout(() => {
            expect(vm.$el.querySelector('#title').textContent).to.equal('500:stop that!')
            done()
        }, 300)
    });
})
