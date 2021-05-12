<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>Usuarios</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="users"
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
import { ALL_USERS_QUERY } from '../graphql/graphql'

export default {
  name: 'Users',

  data () {
    return {
      options: {},
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'id' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Email', sortable: false, value: 'email' }
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
      return this.allUsers?.loading || false
    }
  },

  apollo: {
    allUsers: ALL_USERS_QUERY
  }
}
</script>
