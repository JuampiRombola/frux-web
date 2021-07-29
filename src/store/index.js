import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencyIsUsd: false,
    ethToUsd: undefined,
    showSnackBar: false
  },
  mutations: {
    setCurrencyIsUsd (state, newValue) {
      state.currencyIsUsd = newValue
      state.showSnackBar = true
    },
    setEthToUsd (state, value) {
      state.ethToUsd = value
    },
    setShowSnackBar (state, newValue) {
      state.showSnackBar = newValue
    }
  },
  actions: {
  },
  modules: {
  }
})
