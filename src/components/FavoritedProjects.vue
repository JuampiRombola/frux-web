<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="3"
    :footer-props="footerProps"
  >
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

export default {
  mixins: [common],

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
      { text: 'Favoritos', sortable: false, value: 'favoriteCount' },
      { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
    ],
    footerProps: {
      'items-per-page-options': [3, 5, 10]
    }
  })
}
</script>

<style scoped>

</style>
