<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    :footer-props="footerProps"
    :items-per-page="itemsPerPage"
  >
    <template v-slot:item.owner="{ item }">
      <a href="#" @click.prevent="goToUserDetails(item.owner.dbId)">{{ item.owner.email }}</a>
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
import { ALL_PROJECTS_QUERY } from '../graphql/graphql'

const DEFAULT_ROWS_PER_PAGE = 10

export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: DEFAULT_ROWS_PER_PAGE
    }
  },

  name: 'ProjectsTable',

  data () {
    return {
      options: {},
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Categoría', sortable: false, value: 'category.name' },
        { text: 'Estado', sortable: false, value: 'currentState' },
        { text: 'Recaudado', sortable: false, value: 'amountCollected' },
        { text: 'Objetivo', sortable: false, value: 'goal' },
        { text: 'Emprendedor', sortable: false, value: 'owner' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
      ],
      footerProps: { 'items-per-page-options': [3, 5, 10, 15, -1] }
    }
  },

  computed: {
    projects () {
      return this.allProjects?.edges?.map((e) => e.node) || []
    },

    totalCount () {
      return this.allProjects?.totalCount || this.projects?.length || 0
    },

    loading () {
      return this.allProjects === undefined
    }
  },

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
    },
    goToProjectDetails (id) {
      this.$router.push({ name: 'ProjectDetail', params: { id: id } })
    }
  },

  apollo: {
    allProjects: {
      query: ALL_PROJECTS_QUERY,
      variables: {
        limit: this?.itemsPerPage || DEFAULT_ROWS_PER_PAGE
      }
    }
  }
}
</script>
