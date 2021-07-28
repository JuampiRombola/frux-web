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
            :width="12"
            :value="stage.percentageCollected"
            :color="stage.percentageCollected === 0 ? 'grey' : 'amber'"
          >
            {{ stage.percentageCollected }}
          </v-progress-circular>
        </template>

        <v-row class="pt-1">
          <v-col cols="4" xl="3">
            {{
              (stage.percentageCollected === 100)
                ? getFormattedDate(stage.completedFundingDate)
                : 'No completado'
            }}
          </v-col>
          <v-col>
            <strong>{{ stage.title }}</strong>
            <div class="text-caption">
              <v-icon left small class="py-1">{{ getEthOrUsdIcon() }}</v-icon>
              <strong>{{ getEthOrUsd(stage.goal) }} {{ getEthOrUsdText() }}</strong>
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
import common from '@/mixins/common'

export default {
  mixins: [common],

  props: {
    stages: {
      type: Array,
      default: () => []
    }
  },

  name: 'ProjectTimelineFunding'
}
</script>

<style scoped>

</style>
