/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'

export default new Router({
    routes: [
        { path: '/', component: HelloWorld }
    ]
})
