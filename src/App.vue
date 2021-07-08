<template>
  <v-app>
    <v-app-bar app clipped-left color="white" class="elevation-1" height="56">
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>

      <v-img
        max-width="33"
        :src="require('@/assets/frux-logo.svg')"
        alt="frux logo"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <v-img
        max-width="56"
        :src="require('@/assets/frux-name.svg')"
        alt="frux name"
        class="ml-2 pointer"
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
          :class="['my-2', isSelected(item.associatedRoutes) ? 'selected' : '' ]"
          @click="redirect(item.route)"
        >
          <v-list-item-icon>
            <v-icon :color="isSelected(item.associatedRoutes) ? 'primary' : ''">{{ item.icon }}</v-icon>
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
      mini: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'Dashboard', associatedRoutes: ['Dashboard'] },
        { title: 'Usuarios', icon: 'mdi-account-group', route: 'Users', associatedRoutes: ['Users', 'UserDetail'] },
        { title: 'Proyectos', icon: 'mdi-inbox-multiple', route: 'Projects', associatedRoutes: ['Projects', 'ProjectDetail'] },
        // { title: 'Transacciones', icon: 'mdi-cash-multiple', route: 'Transactions', associatedRoutes: ['Transactions'] },
        { title: 'Métricas', icon: 'mdi-chart-pie', route: 'Metrics', associatedRoutes: ['Metrics'] },
        { title: 'Servidores', icon: 'mdi-server', route: 'Servers', associatedRoutes: ['Servers'] }
      ]
    }
  },

  methods: {
    redirect (routeName) {
      this.$router.push({ name: routeName })
    },
    isSelected (associatedRoutes) {
      return associatedRoutes.includes(this.$router.currentRoute.name)
    },
    toggleMenu () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.drawer = !this.drawer
      } else {
        this.mini = !this.mini
      }
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
