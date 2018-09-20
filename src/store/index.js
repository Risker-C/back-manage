import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data: {},
    ID: ''
  },
  mutations: {
    login (state, date) {
      state.data = date
      console.log(state.data)
    },
    logout (state) {
      state.data = {}
    },
    setID (state, id) {
      state.ID = id
    },
    removeID (state) {
      state.ID = ''
    }
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem(key),
      setItem: (key, value) => sessionStorage.setItem(key, value),
      removeItem: key => sessionStorage.removeItem(key)
    }
  })]
})

export default store
