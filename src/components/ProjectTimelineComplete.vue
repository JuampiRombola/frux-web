<template>
  <v-timeline align-top dense>
    <template v-for="(stage, index) in stages">
      <v-timeline-item
        :key="stage.dbId"
        color="primary lighten-3"
        icon="mdi-check-outline"
        icon-color="white"
        fill-dot
        class="my-2"
      >
        <template v-slot:icon>
          <div class="white--text"># {{ index }} </div>
        </template>

        <v-row class="pt-1">
          <v-col cols="4" xl="3">
            <div><strong>Creado:</strong> {{ getFormattedDate(stage.creationDate) }}</div>
            <div><strong>Financiado:</strong> {{ getFormattedDate(stage.completedFundingDate) }}</div>
            <div><strong>Liberado:</strong> {{ getFormattedDate(stage.fundsReleasedAt) }}</div>
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
import common from '@/mixins/common'

export default {
  mixins: [common],

  props: {
    stages: {
      type: Array,
      default: () => []
    },
    ethAndUsdText: {
      type: Function
    }
  },

  name: 'ProjectTimelineComplete'
}
</script>

<style scoped>

</style>
