<template>
  <v-timeline align-top dense>
    <template v-for="(stage, index) in stages">
      <v-timeline-item
        :key="stage.dbId"
        color="grey"
        icon-color="white"
        fill-dot
        class="my-2"
      >
        <template v-slot:icon>
          <div class="white--text"># {{ index }} </div>
        </template>

        <v-row class="pt-1">
          <v-col cols="4" xl="3">
            {{ getFormattedDate(stage.creationDate) }}
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

  name: 'ProjectTimelineCreated'
}
</script>

<style scoped>

</style>
