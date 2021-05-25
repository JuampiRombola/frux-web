<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    :footer-props="footerProps"
    :items-per-page="itemsPerPage"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
import { ALL_PROJECTS_QUERY } from '../graphql/graphql'

export default {
  props: {
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },

  name: 'ProjectsTable',

  data () {
    return {
      options: {},
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'id' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Objetivo', sortable: false, value: 'goal' },
        { text: 'Descripción', sortable: false, value: 'description' },
        { text: 'ID Usuario', sortable: false, value: 'userId' }
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
      return this.allProjects?.loading || false
    }
  },

  apollo: {
    allProjects: ALL_PROJECTS_QUERY
  }
}
</script>
