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
      { text: 'Recaudado', sortable: false, value: 'amountCollected' },
      { text: 'Objetivo', sortable: false, value: 'goal' }
    ]
  })
}
</script>

<style scoped>

</style>
