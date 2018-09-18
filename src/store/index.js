import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data: {}
  },
  mutations: {
    login (state, date) {
      state.data = date
      console.log(state.data)
    },
    logout (state) {
      state.data = {}
    }
  }
})

export default store
