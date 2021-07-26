<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4" v-for="server in servers" :key="server.name">
        <ServerCard :server="server"></ServerCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ServerCard from '@/components/ServerCard'

export default {
  components: {
    ServerCard
  },

  name: 'Servers',

  props: {
    msg: String
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

</style>
