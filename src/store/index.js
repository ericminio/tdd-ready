import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

import home from './home'

export default new Vuex.Store({

    modules:{
        home:home
    }
})
