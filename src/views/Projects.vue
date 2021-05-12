<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>Proyectos</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="projects"
              :options.sync="options"
              :server-items-length="totalCount"
              :loading="loading"
              class="elevation-1"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ALL_PROJECTS_QUERY } from '../graphql/graphql'

export default {
  name: 'Projects',

  data () {
    return {
      options: {},
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'id' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Objetivo', sortable: false, value: 'goal' },
        { text: 'Descripción', sortable: false, value: 'description' },
        { text: 'ID Usuario', sortable: false, value: 'userId' }
      ]
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
