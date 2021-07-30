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
        <DashboardCardNumber title="Proyectos" :quantity="stats.totalProjects" icon="mdi-tray-full" caption="Histórico" color="secondary"></DashboardCardNumber>
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
    <v-subheader class="subheader-font pl-2 mt-2">Servicios <v-divider class="ml-4"></v-divider></v-subheader>
    <v-row class="my-2">
      <v-col cols="4" v-for="server in servers" :key="server.name">
        <ServerCard :server="server" color="grey darken-1"></ServerCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardCardNumber from '@/components/DashboardCardNumber.vue'
import ServerCard from '@/components/ServerCard.vue'
import { DASHBOARD_STATS } from '@/graphql/graphql'

export default {
  name: 'Dashboard',

  components: {
    DashboardCardNumber,
    ServerCard
  },

  data: () => ({
    servers: [{
      name: 'App Service',
      creationDate: '10-04-21',
      description: 'Servicio principal donde residen las entidades de usuario y proyecto.',
      icon: 'mdi-sprout',
      healthUrl: 'https://frux-app-server.herokuapp.com/health'
    }, {
      name: 'Smart Contract Service',
      creationDate: '07-06-21',
      description: 'Servicio encargado de procesar las transferencias y registrarlas en un Smart Contract.',
      icon: 'mdi-file-document-edit',
      healthUrl: 'https://frux-smart-contract.herokuapp.com/health'
    }, {
      name: 'Chat Service',
      creationDate: '12-07-21',
      description: 'Servicio dedicado a manejar los mensajes entre usuarios y las notificaciones.',
      icon: 'mdi-chat-processing',
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
