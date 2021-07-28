<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="3"
    :footer-props="footerProps"
  >
    <template v-slot:item.score="{ item }">
      <v-icon x-small left color="amber">mdi-star</v-icon>
      {{ item.score }}
    </template>

    <template v-slot:item.generalScore="{ item }">
      <v-icon x-small left color="blue">mdi-star</v-icon>
      {{ item.generalScore }}
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  name: 'UserReviews',

  data: () => ({
    headers: [
      { text: 'Puntaje del usuario', align: 'start', sortable: false, value: 'score' },
      { text: 'Puntaje general', sortable: false, value: 'generalScore' },
      { text: 'ID proyecto', sortable: false, value: 'dbId' },
      { text: 'Nombre', sortable: false, value: 'name' },
      { text: 'Categoría', sortable: false, value: 'categoryName' },
      { text: 'Opinión', sortable: false, value: 'description' }
    ],
    footerProps: {
      'items-per-page-options': [3, 5, 10]
    }
  })
}
</script>

<style scoped>

</style>
