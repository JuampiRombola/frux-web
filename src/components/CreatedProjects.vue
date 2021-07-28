<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:item.creationDate="{ item }">
      {{ getFormattedDate(item.creationDate) }}
    </template>
  </v-data-table>
</template>

<script>
import common from '@/mixins/common'

export default {
  mixins: [common],

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  name: 'CreatedProjects',

  data: () => ({
    headers: [
      { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
      { text: 'Fecha de creación', sortable: false, value: 'creationDate' },
      { text: 'Nombre', sortable: false, value: 'name' },
      { text: 'Categoría', sortable: false, value: 'categoryName' },
      { text: 'Estado', sortable: false, value: 'currentState' },
      { text: 'Recaudado', sortable: false, value: 'amountCollected' },
      { text: 'Objetivo', sortable: false, value: 'goal' },
      { text: 'Goal', sortable: false, value: 'goal' }
    ]
  })
}
</script>

<style scoped>

</style>
