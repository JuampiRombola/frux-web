<template>
  <v-timeline align-top dense>
    <template v-for="stage in stages">
      <v-timeline-item
        :key="stage.dbId"
        color="white"
        icon="mdi-plus"
        icon-color="white"
        fill-dot
        class="my-2"
      >
        <template v-slot:icon>
          <v-progress-circular
            :rotate="270"
            :size="100"
            :width="10"
            :value="stage.percentageCollected"
            color="green lighten-2"
          >
            {{ stage.percentageCollected }}
          </v-progress-circular>
        </template>

        <v-row class="pt-1">
          <v-col cols="3">
            {{
              (stage.percentageCollected === 100)
                ? getFormattedDate(stage.completedFundingDate)
                : 'No completado'
            }}
          </v-col>
          <v-col>
            <strong>{{ stage.title }}</strong>
            <div class="text-caption">
              <v-icon left class="py-1">mdi-cash</v-icon>
              <strong>{{ ethAndUsdText(stage.goal) }}</strong>
            </div>
            <div class="text-caption">
              {{ stage.description }}
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
    },
    getFormattedDate: {
      type: Function
    }
  },

  name: 'ProjectTimelineFunding'
}
</script>

<style scoped>

</style>
