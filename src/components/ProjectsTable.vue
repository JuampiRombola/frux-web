<template>
  <v-data-table
    :headers="headers"
    :items="projects"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :footer-props="footerProps"
  >
    <template v-slot:top>
      <v-card-actions class="px-2 py-2">
        <v-menu
          :close-on-content-click="false"
          min-width="500"
          max-width="500"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              class="pa-0 ma-0"
            >
              <v-icon>mdi-filter-variant-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-text>
              <v-autocomplete
                v-model="selectedCategories"
                :items="categories"
                label="Categorías"
                chips
                deletable-chips
                clearable
                multiple
                small-chips
                prepend-icon="mdi-tag"
              ></v-autocomplete>
              <v-autocomplete
                v-model="selectedStates"
                :items="states"
                label="Estados"
                chips
                deletable-chips
                clearable
                multiple
                small-chips
                prepend-icon="mdi-state-machine"
              ></v-autocomplete>
            </v-card-text>
          </v-card>
        </v-menu>
        <span class="mx-4">
          <v-chip small class="mr-2 my-1" :color="activeFilter ? 'primary lighten-3' : ''" @click="clickActiveFilter">
            <v-icon small left v-if="activeFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Activos
          </v-chip>
          <v-chip small class="mr-2 my-1" :color="blockedFilter ? 'primary lighten-3' : ''" @click="clickBlockedFilter">
            <v-icon small left v-if="blockedFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Bloqueados
          </v-chip>
          <v-chip small class="mr-2 my-1" color="amber lighten-3" v-for="category in selectedCategories" :key="category">
            <v-icon small left>mdi-check</v-icon>
            {{ category }}
          </v-chip>
          <v-chip small class="mr-2 my-1" color="pink lighten-3" v-for="state in states.filter(s => selectedStates.includes(s.value)).map(f => f.text)" :key="state">
            <v-icon small left>mdi-check</v-icon>
            {{ state }}
          </v-chip>
        </span>
        <v-spacer></v-spacer>
        <v-radio-group v-model="operator" row dense hide-details class="pa-0 ma-0">
          <v-radio label="OR" value="or" class="pa-0 my-0 mx-2"></v-radio>
          <v-radio label="AND" value="and" class="pa-0 ma-0 mx-2"></v-radio>
        </v-radio-group>
      </v-card-actions>
      <v-divider></v-divider>
    </template>

    <template v-slot:item.blocked="{ item }">
      <div>
        <v-tooltip bottom v-if="item.isBlocked">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="red" dark v-bind="attrs" v-on="on">mdi-cancel</v-icon>
          </template>
          <span>Usuario bloqueado</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="green" dark v-bind="attrs" v-on="on">mdi-check-circle-outline</v-icon>
          </template>
          <span>Activo</span>
        </v-tooltip>
      </div>
    </template>

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
import { ALL_PROJECTS_QUERY, CATEGORIES_QUERY } from '@/graphql/graphql'

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
        { text: 'Activo', sortable: true, value: 'blocked' },
        { text: 'Nombre', sortable: true, value: 'name' },
        { text: 'Categoría', sortable: true, value: 'category.name' },
        { text: 'Estado', sortable: true, value: 'currentState' },
        { text: 'Recaudado', sortable: false, value: 'amountCollected' },
        { text: 'Objetivo', sortable: true, value: 'goal' },
        { text: 'Emprendedor', sortable: true, value: 'owner' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
      ],
      blockedFilter: false,
      activeFilter: false,
      selectedCategories: [],
      selectedStates: [],
      states: [{
        text: 'Created',
        value: 'CREATED'
      }, {
        text: 'Funding',
        value: 'FUNDING'
      }, {
        text: 'In Progress',
        value: 'IN_PROGRESS'
      }, {
        text: 'Complete',
        value: 'COMPLETE'
      }, {
        text: 'Canceled',
        value: 'CANCELED'
      }],
      operator: 'or'
    }
  },

  computed: {
    projects () {
      return this.allProjects?.edges?.map((e) => e.node) || []
    },

    categories () {
      return this.allCategories?.edges?.map((e) => e.node?.name) || []
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
    },

    footerProps () {
      return {
        'items-per-page-options': [5, 10, 15, 20, 30, 40, 50],
        'disable-items-per-page': this.loading,
        'disable-pagination': this.loading
      }
    },

    filters () {
      return {
        [this.operator]: [
          { [this.operator]: [{ isBlocked: (this.blockedFilter === this.activeFilter) ? undefined : this.blockedFilter || !this.activeFilter }] },
          { [this.operator]: [{ categoryNameIn: (this.selectedCategories.length) ? this.selectedCategories : undefined }] },
          { [this.operator]: [{ currentStateIn: (this.selectedStates.length) ? this.selectedStates : undefined }] }
        ]
      }
    }
  },

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
    },

    goToProjectDetails (id) {
      this.$router.push({ name: 'ProjectDetail', params: { id: id } })
    },

    clickActiveFilter () {
      this.blockedFilter = false
      this.activeFilter = !this.activeFilter
    },

    clickBlockedFilter () {
      this.activeFilter = false
      this.blockedFilter = !this.blockedFilter
    },

    paginate (val, oldVal) {
      const isPreviousPage = val?.page < oldVal?.page
      const isNextPage = val?.page > oldVal?.page
      const isFirstPage = val?.page === oldVal?.page

      let first = this.options.itemsPerPage
      let last
      let endCursor
      let startCursor

      if (isFirstPage) {
        this.options.page = 1
      }

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
        sort: this.sorting,
        filters: this.filters
      })
    }
  },

  watch: {
    options: {
      handler (val, oldVal) {
        this.paginate(val, oldVal)
      },
      deep: true
    },
    filters: {
      handler (val, oldVal) {
        this.paginate(val, oldVal)
      }
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
    },
    allCategories: {
      query: CATEGORIES_QUERY
    }
  }
}
</script>

<style>
.v-radio > .v-label {
  font-size: small !important;
}
</style>
