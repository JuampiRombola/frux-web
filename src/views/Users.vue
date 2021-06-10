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
            >
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
        { text: 'ID', align: 'start', sortable: false, value: 'dbId' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Email', sortable: false, value: 'email' },
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
      return this.allUsers?.loading || false
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
