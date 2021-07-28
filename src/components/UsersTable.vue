<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :footer-props="footerProps"
  >
    <template v-slot:top>
      <v-card-actions class="px-3 py-3">
        <v-icon>mdi-filter-variant</v-icon>
        <span class="mx-4">
          <v-chip small class="mr-2" :color="activeFilter ? 'primary lighten-3' : ''" @click="clickActiveFilter">
            <v-icon small left v-if="activeFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Activos
          </v-chip>
          <v-chip small class="mr-2" :color="blockedFilter ? 'primary lighten-3' : ''" @click="clickBlockedFilter">
            <v-icon small left v-if="blockedFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Bloqueados
          </v-chip>
          <v-chip small class="mr-2" :color="isSeederFilter ? 'primary lighten-3' : ''" @click="isSeederFilter = !isSeederFilter">
            <v-icon small left v-if="isSeederFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Emprendedores
          </v-chip>
          <v-chip small class="mr-2" :color="isSeerFilter ? 'primary lighten-3' : ''" @click="isSeerFilter = !isSeerFilter">
            <v-icon small left v-if="isSeerFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Veedores
          </v-chip>
          <v-chip small class="mr-2" :color="isSponsorFilter ? 'primary lighten-3' : ''" @click="isSponsorFilter = !isSponsorFilter">
            <v-icon small left v-if="isSponsorFilter">mdi-check</v-icon>
            <v-icon small left v-else>mdi-minus</v-icon>
            Patrocinadores
          </v-chip>
        </span>
        <v-spacer></v-spacer>
        <v-radio-group v-model="operator" row dense hide-details class="pa-0 ma-0">
          <v-radio label="OR" value="or" class="pa-0 my-0 mx-2"></v-radio>
          <v-radio label="AND" value="and" class="pa-0 ma-0 mx-2"></v-radio>
        </v-radio-group>
        <v-divider vertical class="mx-2 my-1"></v-divider>
        <div style="width: 200px;" class="ml-3">
          <v-text-field
            v-model="search"
            dense
            outlined
            hide-details
            :append-icon="search.length ? 'mdi-close' : ''"
            label="Buscador"
            @click:append="cleanSearch">
          </v-text-field>
        </div>
      </v-card-actions>
      <v-divider></v-divider>
    </template>

    <template v-slot:item.blocked="{ item }">
      <div>
        <v-tooltip bottom v-if="item.isBlocked">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="red" dark v-bind="attrs" v-on="on">mdi-account-cancel</v-icon>
          </template>
          <span>Usuario bloqueado</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="green" dark v-bind="attrs" v-on="on">mdi-account</v-icon>
          </template>
          <span>Activo</span>
        </v-tooltip>
      </div>
    </template>

    <template v-slot:item.creationDateTime="{ item }">
      {{ getFormattedDate(item.creationDateTime) }}
    </template>

    <template v-slot:item.rol="{ item }">
      <div>
        <v-chip v-if="item.isSeeder" small outlined class="my-1" color="green darken-2 mr-1">Emprendedor</v-chip>
        <v-chip v-if="item.isSponsor" small outlined class="my-1" color="pink darken-1 mr-1">Patrocinador</v-chip>
        <v-chip v-if="item.isSeer" small outlined class="my-1" color="amber darken-4">Veedor</v-chip>
      </div>
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
            @click="goToUserDetails(item.dbId)"
            left
            class="mr-2"
          >
            <v-icon dark>
              mdi-eye
            </v-icon>
          </v-btn>
        </template>
        <span>Ver detalles del usuario</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { ALL_USERS_QUERY } from '@/graphql/graphql'
import common from '@/mixins/common'

const DEFAULT_ROWS_PER_PAGE = 10
const USER_SORT_ENUM = {
  dbId: 'ID',
  blocked: 'IS_BLOCKED',
  username: 'USERNAME',
  email: 'EMAIL',
  creationDateTime: 'CREATION_DATE_TIME',
  lastLogin: 'LAST_LOGIN'
}

export default {
  mixins: [common],

  props: {
    itemsPerPage: {
      type: Number,
      default: DEFAULT_ROWS_PER_PAGE
    }
  },

  name: 'UsersTable',

  data () {
    return {
      skipQuery: true,
      options: {},
      headers: [
        { text: 'ID', align: 'start', sortable: true, value: 'dbId' },
        { text: 'Activo', sortable: true, value: 'blocked' },
        { text: 'Nombre de usuario', sortable: true, value: 'username' },
        { text: 'Email', sortable: true, value: 'email' },
        { text: 'Fecha de creación', sortable: true, value: 'creationDateTime' },
        { text: 'Último ingreso', sortable: true, value: 'lastLogin' },
        { text: 'Rol', sortable: false, value: 'rol' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
      ],
      blockedFilter: false,
      activeFilter: false,
      isSeederFilter: false,
      isSeerFilter: false,
      isSponsorFilter: false,
      operator: 'or',
      search: '',
      searchDebounce: undefined
    }
  },

  computed: {
    users () {
      return this.allUsers?.edges?.map((e) => e.node) || []
    },

    totalCount () {
      return this.allUsers?.totalCount || this.users?.length || 0
    },

    loading () {
      return this.$apollo.loading
    },

    endCursor () {
      return this.allUsers?.pageInfo?.endCursor
    },

    startCursor () {
      return this.allUsers?.pageInfo?.startCursor
    },

    sorting () {
      return this.options.sortBy.length
        ? USER_SORT_ENUM[this.options.sortBy[0]] + '_' + (this.options.sortDesc[0] ? 'DESC' : 'ASC')
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
          { [this.operator]: [{ isSeeder: this.isSeederFilter ? true : undefined }] },
          { [this.operator]: [{ isSeer: this.isSeerFilter ? true : undefined }] },
          { [this.operator]: [{ isSponsor: this.isSponsorFilter ? true : undefined }] },
          { [this.operator]: [{ or: [{ usernameIlike: (this.search.length) ? this.search : undefined }, { emailLike: (this.search.length) ? this.search : undefined }] }] }
        ]
      }
    }
  },

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
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

      if (isNextPage) {
        endCursor = this.endCursor
      }

      if (isFirstPage) {
        this.options.page = 1
      }

      if (isPreviousPage) {
        first = undefined
        last = this.options.itemsPerPage
        startCursor = [this.startCursor]
      }

      this.$apollo.queries.allUsers.refetch({
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
    allUsers: {
      query: ALL_USERS_QUERY,
      variables () {
        return {
          first: this.itemsPerPage
        }
      }
    }
  }
}
</script>

<style>
.v-radio > .v-label {
  font-size: small !important;
}
</style>
