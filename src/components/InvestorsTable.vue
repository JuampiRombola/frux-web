<template>
  <v-data-table
    :headers="headers"
    :items="investors"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
  >
    <template v-slot:item.investedAmount="{ item }">
      {{ getEthOrUsd(item.investedAmount) }} {{ getEthOrUsdText() }}
    </template>

    <template v-slot:item.dateOfInvestment="{ item }">
      {{ getFormattedDate(item.dateOfInvestment) }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
            icon
            small
            @click="goToUserDetails(item.user.dbId)"
            left
            class="mr-2"
          >
            <v-icon dark>
              mdi-eye
            </v-icon>
          </v-btn>
        </template>
        <span>Ver detalles del usuario</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { INVESTORS_QUERY } from '@/graphql/graphql'
import common from '@/mixins/common'

export default {
  mixins: [common],

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
        { text: 'Email', sortable: false, value: 'user.email' },
        { text: 'Fecha', sortable: false, value: 'dateOfInvestment' },
        { text: 'Aporte', sortable: false, value: 'investedAmount' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
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
