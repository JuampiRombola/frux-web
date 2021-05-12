<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <DashboardCardNumber title="Online" quantity="1344" icon="mdi-account-group" captionText="En tiempo real" color="#18aa5e"></DashboardCardNumber>
      </v-col>
      <v-col cols="3">
        <DashboardCardNumber title="Veedurías" quantity="25" icon="mdi-account-group" captionText="Últimas 24 horas" color="#18aa5e"></DashboardCardNumber>
      </v-col>
      <v-col cols="3">
        <DashboardCardNumber title="Patrocinios" quantity="87" icon="mdi-account-group" captionText="Últimas 24 horas" color="#18aa5e"></DashboardCardNumber>
      </v-col>
      <v-col cols="3">
        <DashboardCardNumber title="Transacciones" quantity="106" icon="mdi-account-group" captionText="Últimas 24 horas" color="#18aa5e"></DashboardCardNumber>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <DashboardUserRegistrations></DashboardUserRegistrations>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardUserRegistrations from '@/components/DashboardUserRegistrations.vue'
import DashboardCardNumber from '@/components/DashboardCardNumber.vue'

export default {
  name: 'Dashboard',

  components: {
    DashboardUserRegistrations,
    DashboardCardNumber
  },

  props: {
    msg: String
  },

  data: () => ({
    //
  })
}
</script>
