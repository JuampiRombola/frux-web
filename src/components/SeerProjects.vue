<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:item.currentState="{ item }">
      <StateChip :state="item.currentState" />
    </template>

    <template v-slot:item.amountCollected="{ item }">
      {{ getEthOrUsd(item.amountCollected) }} {{ getEthOrUsdText() }}
    </template>

    <template v-slot:item.goal="{ item }">
      {{ getEthOrUsd(item.goal) }} {{ getEthOrUsdText() }}
    </template>
  </v-data-table>
</template>

<script>
import StateChip from '@/components/StateChip'
import common from '@/mixins/common'

export default {
  mixins: [common],

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  components: {
    StateChip
  },

  name: 'SeerProjects',

  data: () => ({
    headers: [
      { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
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
