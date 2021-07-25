<template>
  <v-timeline align-top dense>
    <template v-for="stage in stages">
      <v-timeline-item
        :key="stage.dbId"
        :color="stage.fundsReleased ? 'green' : 'grey'"
      >
        <v-row class="pt-1">
          <v-col cols="3">
            {{ (stage.fundsReleased)
            ? getFormattedDate(stage.fundsReleasedDate)
            : 'Pendiente' }}
          </v-col>
          <v-col>
            <strong>{{ stage.title }}</strong>
            <div class="text-caption">
              {{ stage.description }}
            </div>
            <div class="text-caption">
              Objetivo: <strong>{{ ethAndUsdText(stage.goal) }}</strong>
            </div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </template>
  </v-timeline>
</template>

<script>
export default {
  props: {
    stages: {
      type: Array,
      default: () => []
    },
    ethAndUsdText: {
      type: Function
    }
  },

  name: 'ProjectTimeline',

  methods: {
    getFormattedDate (rawDate) {
      const date = new Date(rawDate)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }
  }
}
</script>

<style scoped>

</style>
