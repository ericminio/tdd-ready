import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({

    state:{
        message: 'loading...'
    },

    mutations:{
        message(state, value) {
            state.message = value
        }
    },
    actions:{
        fetchMessage(context) {
            axios.get(process.env.VUE_APP_API_URL + '/hello')
                .then((response)=>{
                    context.commit('message', response.data.message)
                })
                .catch((error)=>{
                    context.commit('message', error)
                })
        }
    }
})
