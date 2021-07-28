import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencyIsUsd: false,
    ethToUsd: undefined
  },
  mutations: {
    setCurrencyIsUsd (state, newValue) {
      state.currencyIsUsd = newValue
    },
    setEthToUsd (state, value) {
      state.ethToUsd = value
    }
  },
  actions: {
  },
  modules: {
  }
})
