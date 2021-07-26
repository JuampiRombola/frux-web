<template>
  <v-card
    class="mx-auto"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      :color="color"
      elevation="12"
      rounded
      max-width="calc(100% - 32px)"
    >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-card-title class="white--text overline my-0" style="font-size: 14px !important;">{{ server.name }}</v-card-title>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light my-2 px-2">
        Creado el {{ server.creationDate }}
      </div>
      <div class="subheading font-weight-light grey--text px-2" style="height: 50px">
        {{ server.description }}
      </div>
      <v-divider class="my-2"></v-divider>
      <v-card-actions>
        <v-icon class="mr-2" small color="green">
          mdi-checkbox-blank-circle
        </v-icon>
      <span class="grey--text font-weight-light">{{ caption }}</span>
      <v-spacer></v-spacer>
      <v-btn small color="primary lighten-2" dark>Ping</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DashboardSparkline',

  props: {
    server: Object,
    title: {
      type: String
    },
    subtitle: {
      type: String,
      default: 'En las últimas 12 horas'
    },
    caption: {
      type: String
    },
    color: {
      type: String
    },
    labels: {
      type: Array
    },
    values: {
      type: Array
    }
  },

  data: () => ({})
}
</script>

<style scoped>
.v-sheet--offset {
  top: -10px;
  position: relative;
}
</style>
