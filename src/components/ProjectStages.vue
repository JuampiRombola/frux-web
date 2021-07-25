<template>
  <div>
    <v-stepper alt-labels flat v-model="selected">
      <v-stepper-header>
        <v-stepper-step step="1" editable complete :edit-icon="getEditIcon('CREATED')" :color="getCompleteColor('CREATED')"><v-chip>CREATED</v-chip></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :editable="canViewFunding" :complete="canViewFunding" :edit-icon="getEditIcon('FUNDING')" :color="getCompleteColor('FUNDING')"><v-chip>FUNDING</v-chip></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :editable="canViewInProgress" :complete="canViewInProgress" :edit-icon="getEditIcon('IN PROGRESS')" :color="getCompleteColor('IN PROGRESS')"><v-chip>IN PROGRESS</v-chip></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :editable="canViewComplete" :complete="canViewComplete" :edit-icon="getEditIcon('COMPLETE')" :color="getCompleteColor('COMPLETE')"><v-chip>COMPLETE</v-chip></v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <ProjectTimelineCreated :stages="stages" :eth-and-usd-text="ethAndUsdText" :get-formatted-date="getFormattedDate" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <ProjectTimeline :stages="stages" :eth-and-usd-text="ethAndUsdText" :get-formatted-date="getFormattedDate" />
        </v-stepper-content>
        <v-stepper-content step="3">
          <ProjectTimeline :stages="stages" :eth-and-usd-text="ethAndUsdText" :get-formatted-date="getFormattedDate" />
        </v-stepper-content>
        <v-stepper-content step="4">
          <ProjectTimeline :stages="stages" :eth-and-usd-text="ethAndUsdText" :get-formatted-date="getFormattedDate" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import ProjectTimeline from '@/components/ProjectTimeline'
import ProjectTimelineCreated from '@/components/ProjectTimelineCreated'

export default {
  props: {
    stages: {
      type: Array,
      default: () => []
    },
    ethAndUsdText: {
      type: Function
    },
    currentState: {
      type: String,
      default: 'CREATED'
    },
    getFormattedDate: {
      type: Function
    }
  },

  components: {
    ProjectTimeline,
    ProjectTimelineCreated
  },

  name: 'ProjectStages',

  data: () => ({
    selected: 1,
    states: ['CREATED', 'FUNDING', 'IN PROGRESS', 'COMPLETE']
  }),

  computed: {
    currentStateIndex () {
      return this.states.indexOf(this.currentState)
    },
    canViewFunding () {
      return this.currentStateIndex >= this.states.indexOf('FUNDING')
    },
    canViewInProgress () {
      return this.currentStateIndex >= this.states.indexOf('IN PROGRESS')
    },
    canViewComplete () {
      return this.currentStateIndex >= this.states.indexOf('COMPLETE')
    }
  },

  methods: {
    getEditIcon (state) {
      return (this.currentState === state && this.currentState !== 'COMPLETE') ? 'mdi-circle-small' : 'mdi-check'
    },
    getCompleteColor (state) {
      return (this.currentState === state && this.currentState !== 'COMPLETE') ? 'amber' : 'primary lighten-3'
    }
  },

  mounted () {
    this.selected = this.currentStateIndex + 1
  }
}
</script>

<style scoped>

</style>
