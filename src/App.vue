<template>
  <v-app>
    <v-app-bar app clipped-left color="white" class="elevation-1">
      <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>

      <v-img
        max-width="38"
        :src="require('@/assets/frux-logo.svg')"
        alt="frux logo"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <v-img
        max-width="80"
        :src="require('@/assets/frux-name.svg')"
        alt="frux name"
        class="ml-1 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      clipped
      color="#0D44511A"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :class="['my-2', isCurrentRoute(item.route) ? 'selected' : '' ]"
          @click="redirect(item.route)"
        >
          <v-list-item-icon>
            <v-icon :color="isCurrentRoute(item.route) ? 'primary' : ''">{{ item.icon }}</v-icon>
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
    },
    isCurrentRoute (routeName) {
      return this.$router.currentRoute.name === routeName
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: rgba(13, 68, 81, 0.2);
}
.pointer {
  cursor: pointer;
}
</style>
