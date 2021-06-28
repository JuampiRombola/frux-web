<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :footer-props="footerProps"
    :hide-default-footer="loading"
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
import { ALL_PROJECTS_QUERY } from '@/graphql/graphql'

const DEFAULT_ROWS_PER_PAGE = 10
const PROJECT_SORT_ENUM = {
  dbId: 'ID',
  name: 'NAME',
  currentState: 'CURRENT_STATE',
  'category.name': 'CATEGORY_NAME',
  goal: 'GOAL',
  owner: 'USER_ID'
}

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
        { text: 'ID', align: 'start', sortable: true, value: 'dbId' },
        { text: 'Nombre', sortable: true, value: 'name' },
        { text: 'Categoría', sortable: true, value: 'category.name' },
        { text: 'Estado', sortable: true, value: 'currentState' },
        { text: 'Recaudado', sortable: false, value: 'amountCollected' },
        { text: 'Objetivo', sortable: true, value: 'goal' },
        { text: 'Emprendedor', sortable: true, value: 'owner' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
      ],
      footerProps: { 'items-per-page-options': [5, 10, 15, 20, 30, 40, 50] }
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
      return this.$apollo.loading
    },

    endCursor () {
      return this.allProjects?.pageInfo?.endCursor
    },

    startCursor () {
      return this.allProjects?.pageInfo?.startCursor
    },

    sorting () {
      return this.options.sortBy.length
        ? PROJECT_SORT_ENUM[this.options.sortBy[0]] + '_' + (this.options.sortDesc[0] ? 'DESC' : 'ASC')
        : undefined
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

  watch: {
    options: {
      handler (val, oldVal) {
        const isPreviousPage = val?.page < oldVal?.page
        const isNextPage = val?.page > oldVal?.page

        let first = this.options.itemsPerPage
        let last
        let endCursor
        let startCursor

        if (isNextPage) {
          endCursor = this.endCursor
        }

        if (isPreviousPage) {
          first = undefined
          last = this.options.itemsPerPage
          startCursor = [this.startCursor]
        }

        this.$apollo.queries.allProjects.refetch({
          first: first,
          last: last,
          endCursor: endCursor,
          startCursor: startCursor,
          sort: this.sorting
        })
      },
      deep: true
    }
  },

  apollo: {
    allProjects: {
      query: ALL_PROJECTS_QUERY,
      variables () {
        return {
          first: this.itemsPerPage
        }
      }
    }
  }
}
</script>
