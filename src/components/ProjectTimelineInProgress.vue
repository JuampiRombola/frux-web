<template>
  <v-timeline align-top dense>
    <template v-for="stage in stages">
      <v-timeline-item
        :key="stage.dbId"
        :color="stage.fundsReleased ? 'green lighten-2' : 'grey'"
        :icon="stage.fundsReleased ? 'mdi-check' : 'mdi-minus'"
        icon-color="white"
        fill-dot
        class="my-2"
      >
        <v-row class="pt-1">
          <v-col cols="4" xl="3">
            {{ (stage.fundsReleased)
            ? getFormattedDate(stage.fundsReleasedAt)
            : 'Sin liberar' }}
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

  name: 'ProjectTimelineInProgress'
}
</script>

<style scoped>

</style>
