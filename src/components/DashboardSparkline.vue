<template>
  <v-card
    class="mx-auto"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      :color="color"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="values"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
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
  top: -24px;
  position: relative;
}
</style>
