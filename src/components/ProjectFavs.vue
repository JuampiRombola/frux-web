<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="grey lighten-2">
      <v-toolbar-title>Favoritos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-blur icon @click="cancelCallback">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="user in users"
        :key="user.dbId"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${user.username} avatar`"
            :src="require('@/assets/frux-logo.svg')"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.username"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary lighten-2"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                @click="goToUserDetails(user.dbId)"
                left
                class="mr-2"
              >
                <v-icon dark>mdi-chevron-right-circle</v-icon>
              </v-btn>
            </template>
            <span>Ir a detalles del usuario</span>
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    cancelCallback: {
      type: Function
    },
    users: {
      type: Array,
      default: () => []
    }
  },

  name: 'ProjectFavs',

  data: () => ({
  }),

  methods: {
    goToUserDetails (id) {
      this.$router.push({ name: 'UserDetail', params: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
