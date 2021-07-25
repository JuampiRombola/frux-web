<template>
  <v-data-table
    :headers="headers"
    :items="investors"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
  >
    <template v-slot:item.investedAmount="{ item }">
      {{ ethAndUsdText(item.investedAmount) }}
    </template>
  </v-data-table>
</template>

<script>
import { INVESTORS_QUERY } from '@/graphql/graphql'

export default {
  props: {
    projectId: {
      type: Number,
      default: undefined
    },
    ethToUsd: {
      type: Number,
      default: undefined
    }
  },

  name: 'InvestorsTable',

  data () {
    return {
      options: {},
      headers: [
        { text: 'User ID', align: 'start', sortable: false, value: 'user.dbId' },
        { text: 'Email', sortable: false, value: 'user.email' },
        { text: 'Fecha', sortable: false, value: 'dateOfInvestment' },
        { text: 'Aporte', sortable: false, value: 'investedAmount' }
      ]
    }
  },

  computed: {
    investors () {
      return this.project?.investors?.edges?.map((e) => e.node) || []
    },

    totalCount () {
      return this.project?.totalCount || this.investors?.length || 0
    },

    loading () {
      return this.project?.investors === undefined
    }
  },

  methods: {
    ethAndUsdText (amount) {
      const formattedAmount = parseFloat(amount).toFixed(4)
      if (!this.ethToUsd) {
        return `${formattedAmount} ETH`
      }
      const usd = Math.round(amount * this.ethToUsd)
      return `${usd} USD  (${formattedAmount} ETH)`
    }
  },

  apollo: {
    project: {
      query: INVESTORS_QUERY,
      variables () {
        return {
          id: this.projectId
        }
      }
    }
  }
}
</script>
