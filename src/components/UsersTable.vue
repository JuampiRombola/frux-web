<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalCount"
    :loading="loading"
    class="elevation-1"
  >
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
import { ALL_USERS_QUERY } from '../graphql/graphql'

const DEFAULT_ROWS_PER_PAGE = 30

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
      options: {},
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
        { text: 'Nombre de usuario', sortable: false, value: 'username' },
        { text: 'Email', sortable: false, value: 'email' },
        { text: 'Fecha de creación', sortable: false, value: 'creationDateTime' },
        { text: 'Último ingreso', sortable: false, value: 'lastLogin' },
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
      return this.allUsers === undefined
    }
  },

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
    }
  },

  apollo: {
    allUsers: ALL_USERS_QUERY
  }
}
</script>

<style scoped>

</style>
