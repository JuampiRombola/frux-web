<template>
  <v-container>
    <v-subheader class="subheader-font">Métricas generales <v-divider class="ml-5"></v-divider></v-subheader>
    <v-row class="my-3">
      <v-col cols="4">
        <DashboardCardNumber title="Online" quantity="1344" icon="mdi-account-multiple" caption="En tiempo real" color="amber"></DashboardCardNumber>
      </v-col>
      <v-col cols="4">
        <DashboardCardNumber title="Veedores" quantity="25" icon="mdi-shield-account" caption="Últimas 24 horas" color="blue"></DashboardCardNumber>
      </v-col>
      <v-col cols="4">
        <DashboardCardNumber title="Patrocinios" quantity="87" icon="mdi-charity" caption="Últimas 24 horas" color="green"></DashboardCardNumber>
      </v-col>
      <v-col cols="4" class="mt-6">
        <DashboardCardNumber title="Me gusta" quantity="106" icon="mdi-heart" caption="Últimas 24 horas" color="pink"></DashboardCardNumber>
      </v-col>
      <v-col cols="4" class="mt-6">
        <DashboardCardNumber title="Me gusta" quantity="106" icon="mdi-heart" caption="Últimas 24 horas" color="pink"></DashboardCardNumber>
      </v-col>
      <v-col cols="4" class="mt-6">
        <DashboardCardNumber title="Me gusta" quantity="106" icon="mdi-heart" caption="Últimas 24 horas" color="pink"></DashboardCardNumber>
      </v-col>
    </v-row>
    <v-subheader class="subheader-font mt-2">Servidores <v-divider class="ml-5"></v-divider></v-subheader>
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
  })
}
</script>

<style scoped>
.subheader-font {
  font-size: medium !important;
}
</style>
