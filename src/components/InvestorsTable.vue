<template>
  <v-data-table
    :headers="headers"
    :items="investors"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
  ></v-data-table>
</template>

<script>
import { INVESTORS_QUERY } from '../graphql/graphql'

export default {
  props: {
    projectId: {
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
        { text: 'Nombre', sortable: false, value: 'user.name' },
        { text: 'Email', sortable: false, value: 'user.email' },
        { text: 'Fecha', sortable: false, value: 'dateOfInvestment' },
        { text: 'Aporte', align: 'end', sortable: false, value: 'investedAmount' }
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
