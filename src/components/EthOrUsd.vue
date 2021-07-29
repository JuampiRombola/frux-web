<template>
  <v-switch
    v-model="toggle"
    prepend-icon="mdi-ethereum"
    append-icon="mdi-cash"
    hide-details
    class="my-0 mx-4 pa-0 custom-red"
    color="green lighten-1"
    @change="fetchConversion"
  ></v-switch>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EthOrUsd',

  computed: {
    ...mapState([
      'currencyIsUsd'
    ]),
    toggle: {
      set (newValue) {
        this.setCurrencyIsUsd(newValue)
      },
      get () {
        return this.currencyIsUsd
      }
    }
  },

  methods: {
    ...mapMutations([
      'setCurrencyIsUsd',
      'setEthToUsd'
    ]),

    fetchConversion () {
      if (!this.currencyIsUsd) {
        return
      }
      fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
        .then(response => response.json()).then(jsonData => {
          this.setEthToUsd(jsonData.USD)
        })
    }
  }
}
</script>

<style scoped>

</style>
