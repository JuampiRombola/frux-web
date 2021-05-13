<template>
  <v-container>
    <v-row class="my-3">
      <v-col cols="3">
        <DashboardCardNumber title="Usuarios Online" quantity="1344" icon="mdi-account-multiple" caption="En tiempo real" color="amber"></DashboardCardNumber>
      </v-col>
      <v-col cols="3">
        <DashboardCardNumber title="Veedurías" quantity="25" icon="mdi-shield-account" caption="Últimas 24 horas" color="blue"></DashboardCardNumber>
      </v-col>
      <v-col cols="3">
        <DashboardCardNumber title="Patrocinios" quantity="87" icon="mdi-charity" caption="Últimas 24 horas" color="pink"></DashboardCardNumber>
      </v-col>
      <v-col cols="3">
        <DashboardCardNumber title="Transacciones" quantity="106" icon="mdi-cash-multiple" caption="Últimas 24 horas" color="green"></DashboardCardNumber>
      </v-col>
    </v-row>
    <v-row class="mt-9 mb-2">
      <v-col cols="6">
        <DashboardSparkline color="grey darken-1" title="Usuarios Registrados" caption="último registro hace 7 minutos"
                            :labels="['6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h']"
                            :values="[100, 200, 300, 700, 400, 600, 1000, 1300, 1200, 900, 900, 900, 100]"></DashboardSparkline>
      </v-col>
      <v-col cols="6">
        <DashboardSparkline color="grey darken-1" title="Proyectos Creados" caption="última creación hace 1 minuto"
                            :labels="['6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h']"
                            :values="[5, 2, 7, 17, 4, 6, 10, 13, 2, 5, 9, 3, 18]"></DashboardSparkline>
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

  props: {
    msg: String
  },

  data: () => ({
    //
  })
}
</script>
