<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
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
    ]
  })
}
</script>

<style scoped>

</style>
