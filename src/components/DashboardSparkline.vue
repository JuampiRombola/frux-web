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
        <v-card-title class="white--text overline my-2" style="font-size: 14px !important;">{{ server.name }}</v-card-title>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        {{ title }}
      </div>
      <div class="subheading font-weight-light grey--text">
        {{ subtitle }}
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">{{ caption }}</span>
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
