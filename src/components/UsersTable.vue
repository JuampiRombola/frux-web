<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    class="elevation-1"
    :items-per-page="itemsPerPage"
    :footer-props="{
      'items-per-page-options': [5, 10, 15, 20, 30, 40, 50]
    }"
  >
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
        { text: 'Status', sortable: true, value: 'blocked' },
        { text: 'Nombre de usuario', sortable: true, value: 'username' },
        { text: 'Email', sortable: true, value: 'email' },
        { text: 'Fecha de creación', sortable: true, value: 'creationDateTime' },
        { text: 'Último ingreso', sortable: true, value: 'lastLogin' },
        { text: 'Rol', sortable: false, value: 'rol' },
        { text: 'Detalles', align: 'end', sortable: false, value: 'actions' }
      ]
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
    }
  },

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
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

        this.$apollo.queries.allUsers.skip = false
        this.$apollo.queries.allUsers.refetch({
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
    allUsers: {
      query: ALL_USERS_QUERY,
      skip () {
        return this.skipQuery
      }
    }
  }
}
</script>

<style scoped>

</style>
