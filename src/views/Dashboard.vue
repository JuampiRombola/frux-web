<template>
  <v-container v-if="$apollo.queries.stats.loading">
    <v-row style="height: 400px">
      <v-col class="text-center" align-self="center">
        <v-progress-circular indeterminate :size="100" :width="8" color="primary lighten-3" class="mt-5"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-subheader class="subheader-font pl-2">Métricas generales <v-divider class="ml-4"></v-divider></v-subheader>
    <v-row class="my-3">
      <v-col cols="4">
        <DashboardCardNumber title="Usuarios" :quantity="stats.totalUsers" icon="mdi-account-multiple" caption="Histórico" color="amber"></DashboardCardNumber>
      </v-col>
      <v-col cols="4">
        <DashboardCardNumber title="Proyectos" :quantity="stats.totalProjects" icon="mdi-tray-full" caption="Histórico" color="grey darken-1"></DashboardCardNumber>
      </v-col>
      <v-col cols="4">
        <DashboardCardNumber title="Patrocinios" :quantity="stats.totalInvestments" icon="mdi-charity" caption="Histórico" color="green"></DashboardCardNumber>
      </v-col>
      <v-col cols="4" class="mt-6">
        <DashboardCardNumber title="Veedores" :quantity="stats.totalSeers" icon="mdi-shield-account" caption="Histórico" color="blue"></DashboardCardNumber>
      </v-col>
      <v-col cols="4" class="mt-6">
        <DashboardCardNumber title="Favoritos" :quantity="stats.totalFavorites" icon="mdi-heart" caption="Histórico" color="pink"></DashboardCardNumber>
      </v-col>
      <v-col cols="4" class="mt-6">
        <DashboardCardNumber title="Hashtags" :quantity="stats.totalHashtags" icon="mdi-pound" caption="Histórico" color="purple lighten-1"></DashboardCardNumber>
      </v-col>
    </v-row>
    <v-subheader class="subheader-font pl-2 mt-2">Servidores <v-divider class="ml-4"></v-divider></v-subheader>
    <v-row class="my-2">
      <v-col cols="4" v-for="server in servers" :key="server.name">
        <DashboardSparkline :server="server" color="grey darken-1" title="Usuarios Registrados" caption="último registro hace 7 minutos"
                            :labels="['6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h']"
                            :values="[100, 200, 300, 700, 400, 600, 1000, 1300, 1200, 900, 900, 900, 100]"></DashboardSparkline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardSparkline from '@/components/DashboardSparkline.vue'
import DashboardCardNumber from '@/components/DashboardCardNumber.vue'
import { DASHBOARD_STATS } from '@/graphql/graphql'

export default {
  name: 'Dashboard',

  components: {
    DashboardSparkline,
    DashboardCardNumber
  },

  data: () => ({
    servers: [{
      name: 'App Server',
      creationDate: '10-04-21',
      description: 'Servidor principal donde residen las entidades de usuario y proyecto.',
      healthUrl: 'https://frux-app-server.herokuapp.com/health'
    }, {
      name: 'Smart Contract Server',
      creationDate: '07-06-21',
      description: 'Servidor encargado de procesar las transferencias y registrarlas en un Smart Contract.',
      healthUrl: 'https://frux-smart-contract.herokuapp.com/health'
    }, {
      name: 'Chat Server',
      creationDate: '12-07-21',
      description: 'Servidor dedicado a manejar los mensajes entre usuarios y las notificaciones.',
      healthUrl: 'https://frux-chat.herokuapp.com/health'
    }]
  }),

  apollo: {
    stats: {
      query: DASHBOARD_STATS
    }
  }
}
</script>

<style scoped>
.subheader-font {
  font-size: medium !important;
}
</style>
