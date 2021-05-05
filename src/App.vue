<template>
  <v-app>
    <v-app-bar app dense flat clipped-left color="primary">
      <v-app-bar-nav-icon color="white" @click="mini = !mini"></v-app-bar-nav-icon>

      <v-toolbar-title>Frux</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      color="accent"
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="my-2"
          @click="redirect(item.route)"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'Dashboard' },
        { title: 'Usuarios', icon: 'mdi-account-group', route: 'Users' },
        { title: 'Proyectos', icon: 'mdi-inbox-multiple', route: 'Projects' },
        { title: 'Transacciones', icon: 'mdi-cash-multiple', route: 'Dashboard' },
        { title: 'Métricas', icon: 'mdi-chart-pie', route: 'Dashboard' },
        { title: 'Servidores', icon: 'mdi-server', route: 'Dashboard' }
      ],
      mini: true
    }
  },

  methods: {
    redirect (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
