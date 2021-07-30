<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:item.dateOfInvestment="{ item }">
      {{ getFormattedDate(item.dateOfInvestment) }}
    </template>

    <template v-slot:item.currentState="{ item }">
      <StateChip :state="item.currentState" />
    </template>

    <template v-slot:item.investedAmount="{ item }">
      {{ getEthOrUsd(item.investedAmount) }} {{ getEthOrUsdText() }}
    </template>

    <template v-slot:item.amountCollected="{ item }">
      {{ getEthOrUsd(item.amountCollected) }} {{ getEthOrUsdText() }}
    </template>

    <template v-slot:item.goal="{ item }">
      {{ getEthOrUsd(item.goal) }} {{ getEthOrUsdText() }}
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
            @click="goToProjectDetails(item.dbId)"
            left
            class="mr-2"
          >
            <v-icon dark>
              mdi-eye
            </v-icon>
          </v-btn>
        </template>
        <span>Ver detalles del proyecto</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import common from '@/mixins/common'
import StateChip from '@/components/StateChip'

export default {
  mixins: [common],

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  name: 'InvestedProjects',

  components: {
    StateChip
  },

  data: () => ({
    headers: [
      { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
      { text: 'Fecha de patrocinio', sortable: false, value: 'dateOfInvestment' },
      { text: 'Nombre', sortable: false, value: 'name' },
      { text: 'Categoría', sortable: false, value: 'categoryName' },
      { text: 'Estado', sortable: false, value: 'currentState' },
      { text: 'Inversión del usuario', sortable: false, value: 'investedAmount' },
      { text: 'Recaudado', sortable: false, value: 'amountCollected' },
      { text: 'Objetivo', sortable: false, value: 'goal' },
      { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
    ]
  })
}
</script>

<style scoped>

</style>
