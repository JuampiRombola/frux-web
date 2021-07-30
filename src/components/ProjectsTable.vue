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
            </v-card-text>
          </v-card>
        </v-menu>
        <span class="mx-4">
          <v-chip
            small
            class="mr-2 my-1"
            :color="selectedStates.includes(state.value) ? 'primary lighten-3' : ''"
            v-for="state in states"
            :key="state.value"
            @click="clickStateFilter(state.value)"
          >
            <v-icon small left v-if="selectedStates.includes(state.value)">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            {{ state.text }}
          </v-chip>
          <v-chip
            small
            class="mr-2 my-1"
            color="amber lighten-3"
            v-for="category in selectedCategories"
            :key="category"
            close
            @click:close="removeCategory(category)"
          >
            <v-icon small left>mdi-check</v-icon>
            {{ category }}
          </v-chip>
        </span>
        <v-spacer></v-spacer>
        <v-radio-group v-model="operator" row dense hide-details class="pa-0 ma-0">
          <v-radio label="Contiene" value="or" class="pa-0 my-0 mx-2"></v-radio>
          <v-radio label="Es igual" value="and" class="pa-0 ma-0 mx-2"></v-radio>
        </v-radio-group>
        <v-divider vertical class="mx-2 my-1"></v-divider>
        <div style="width: 200px;" class="ml-3">
          <v-text-field
            v-model="search"
            dense
            outlined
            hide-details
            :append-icon="search.length ? 'mdi-close' : ''"
            label="Buscar por nombre"
            @click:append="cleanSearch">
          </v-text-field>
        </div>
      </v-card-actions>
      <v-divider></v-divider>
    </template>

    <template v-slot:item.owner="{ item }">
      <a href="#" @click.prevent="goToUserDetails(item.owner.dbId)">{{ getUserName(item.owner) }}</a>
    </template>

    <template v-slot:item.seer="{ item }">
      <a href="#" @click.prevent="goToUserDetails(item.seer.dbId)" v-if="item.seer">{{ getUserName(item.seer) }}</a>
      <v-chip v-if="!item.seer" small>Sin Asignar</v-chip>
    </template>

    <template v-slot:item.currentState="{ item }">
      <StateChip :state="item.currentState" />
    </template>

    <template v-slot:item.amountCollected="{ item }">
      {{ getEthOrUsd(item.amountCollected) }} {{ getEthOrUsdText() }}
    </template>

    <template v-slot:item.goal="{ item }">
      {{ getEthOrUsd(item.goal) }} {{ getEthOrUsdText() }}
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
import StateChip from '@/components/StateChip'
import common from '@/mixins/common'

const DEFAULT_ROWS_PER_PAGE = 10
const PROJECT_SORT_ENUM = {
  dbId: 'ID',
  name: 'NAME',
  currentState: 'CURRENT_STATE',
  'category.name': 'CATEGORY_NAME',
  goal: 'GOAL',
  owner: 'USER_ID',
  seer: 'SEER_ID'
}

export default {
  mixins: [common],

  props: {
    itemsPerPage: {
      type: Number,
      default: DEFAULT_ROWS_PER_PAGE
    }
  },

  name: 'ProjectsTable',

  components: {
    StateChip
  },

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
        { text: 'Veedor', sortable: true, value: 'seer' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
      ],
      selectedCategories: [],
      selectedStates: [],
      search: '',
      searchDebounce: undefined,
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

    categoriesFilters () {
      return this.selectedCategories.map(category => {
        return ({ [this.operator]: [{ categoryNameLike: category }] })
      })
    },

    stateFilters () {
      return this.selectedStates.map(state => {
        return ({ [this.operator]: [{ currentState: state }] })
      })
    },

    filters () {
      return {
        [this.operator]: [
          { [this.operator]: [{ nameIlike: (this.search.length) ? `%${this.search}%` : undefined }] }
        ].concat(this.categoriesFilters).concat(this.stateFilters)
      }
    }
  },

  methods: {
    clickStateFilter (state) {
      if (this.selectedStates.includes(state)) {
        this.selectedStates.splice(this.selectedStates.indexOf(state), 1)
      } else {
        this.selectedStates.push(state)
      }
    },

    removeCategory (category) {
      if (this.selectedCategories.includes(category)) {
        this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1)
      }
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
    },
    cleanSearch () {
      this.search = ''
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
        clearTimeout(this.searchDebounce)
        this.searchDebounce = setTimeout(() => this.paginate(val, oldVal), 200)
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
