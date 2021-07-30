import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'currencyIsUsd',
      'ethToUsd'
    ])
  },

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
    },
    goToProjectDetails (id) {
      this.$router.push({ name: 'ProjectDetail', params: { id: id } })
    },
    getFormattedDate (rawDate) {
      const date = new Date(rawDate)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    },
    getEthOrUsd (balance) {
      if (balance === 0) {
        return 0
      }
      if (this.currencyIsUsd && this.ethToUsd) {
        return Math.round(this.ethToUsd * balance)
      }
      return parseFloat(balance).toFixed(4)
    },
    getEthOrUsdText () {
      return (this.currencyIsUsd && this.ethToUsd) ? 'USD' : 'ETH'
    },
    getEthOrUsdIcon () {
      return (this.currencyIsUsd && this.ethToUsd) ? 'mdi-cash' : 'mdi-ethereum'
    },
    getUserName (user) {
      const fullNameOrEmail = (user.firstName && user.lastName)
        ? `${user.firstName} ${user.lastName}`
        : user.email.split('@')[0]
      return user.username || fullNameOrEmail
    }
  }
}
