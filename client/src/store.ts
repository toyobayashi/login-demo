import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.sessionStorage.getItem('_token') || ''
  },
  mutations: {
    ['SET_TOKEN'] (state, { token }) {
      window.sessionStorage.setItem('_token', token)
      state.token = token
    }
  },
  actions: {

  }
})
