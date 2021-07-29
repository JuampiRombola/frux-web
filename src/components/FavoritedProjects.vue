<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="3"
    :footer-props="footerProps"
  ></v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  name: 'FavoritedProjects',

  data: () => ({
    headers: [
      { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
      { text: 'Nombre', sortable: false, value: 'name' },
      { text: 'Categoría', sortable: false, value: 'categoryName' },
      { text: 'Favoritos', sortable: false, value: 'favoriteCount' }
    ],
    footerProps: {
      'items-per-page-options': [3, 5, 10]
    }
  })
}
</script>

<style scoped>

</style>
