<template>
  <div>
    <v-stepper alt-labels flat v-model="selected">
      <v-stepper-header>
        <v-stepper-step
          step="1"
          editable
          complete
          :edit-icon="getEditIcon('CREATED')"
          :color="getCompleteColor('CREATED')"
          :class="{'color-stepper': selected === '1' || selected === 1}"
        >
          <v-chip>CREATED</v-chip>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="2"
          :editable="canViewFunding"
          :complete="canViewFunding"
          :edit-icon="getEditIcon('FUNDING')"
          :color="getCompleteColor('FUNDING')"
          :class="{'color-stepper': selected === '2' || selected === 2}"
        >
          <v-chip>FUNDING</v-chip>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="3"
          :editable="canViewInProgress"
          :complete="canViewInProgress"
          :edit-icon="getEditIcon('IN_PROGRESS')"
          :color="getCompleteColor('IN_PROGRESS')"
          :class="{'color-stepper': selected === '3' || selected === 3}"
        >
          <v-chip>IN PROGRESS</v-chip>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="4"
          :editable="canViewComplete"
          :complete="canViewComplete"
          :edit-icon="getEditIcon('COMPLETE')"
          :color="getCompleteColor('COMPLETE')"
          :class="{'color-stepper': selected === '4' || selected === 4}"
        >
          <v-chip>COMPLETE</v-chip>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <ProjectTimelineCreated
            :stages="sortByCreatedDate(stages)"
            :eth-and-usd-text="ethAndUsdText"
            :get-formatted-date="getFormattedDate"
          />
        </v-stepper-content>
        <v-stepper-content step="2">
          <ProjectTimelineFunding
            :stages="sortByCreatedDate(fundingStages)"
            :eth-and-usd-text="ethAndUsdText"
            :get-formatted-date="getFormattedDate"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <ProjectTimelineInProgress
            :stages="sortByCreatedDate(stages)"
            :eth-and-usd-text="ethAndUsdText"
            :get-formatted-date="getFormattedDate"
          />
        </v-stepper-content>
        <v-stepper-content step="4">
          <ProjectTimelineComplete
            :stages="sortByCreatedDate(fundingStages)"
            :eth-and-usd-text="ethAndUsdText"
            :get-formatted-date="getFormattedDate"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import ProjectTimelineCreated from '@/components/ProjectTimelineCreated'
import ProjectTimelineFunding from '@/components/ProjectTimelineFunding'
import ProjectTimelineInProgress from '@/components/ProjectTimelineInProgress'
import ProjectTimelineComplete from '@/components/ProjectTimelineComplete'

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
    },
    amountCollected: {
      type: Number,
      default: 0
    },
    investors: {
      type: Array,
      default: () => []
    }
  },

  components: {
    ProjectTimelineCreated,
    ProjectTimelineFunding,
    ProjectTimelineInProgress,
    ProjectTimelineComplete
  },

  name: 'ProjectStages',

  data: () => ({
    selected: 1,
    states: ['CREATED', 'FUNDING', 'IN_PROGRESS', 'COMPLETE']
  }),

  computed: {
    currentStateIndex () {
      return this.states.indexOf(this.currentState)
    },
    canViewFunding () {
      return this.currentStateIndex >= this.states.indexOf('FUNDING')
    },
    canViewInProgress () {
      return this.currentStateIndex >= this.states.indexOf('IN_PROGRESS')
    },
    canViewComplete () {
      return this.currentStateIndex >= this.states.indexOf('COMPLETE')
    },
    fundingStages () {
      return this.stages.map(stage => {
        stage.percentageCollected = this.getPercentageCollectedForStage(stage)
        stage.completedFundingDate = this.getCompletedFundingDate(stage)
        return stage
      })
    }
  },

  methods: {
    getEditIcon (state) {
      return (this.currentState === state && this.currentState !== 'COMPLETE') ? 'mdi-circle-small' : 'mdi-check'
    },
    getCompleteColor (state) {
      return (this.currentState === state && this.currentState !== 'COMPLETE') ? 'amber' : 'primary lighten-3'
    },
    _getTotalGoalUntilCurrentStage (stage) {
      let totalGoalUntilCurrentStage = 0
      for (let i = 1; i < stage.stageIndex; i++) {
        totalGoalUntilCurrentStage += this.stages.filter(s => s.stageIndex === i)[0].goal
      }
      return totalGoalUntilCurrentStage
    },
    getPercentageCollectedForStage (stage) {
      const collectedFromCurrentStage = this.amountCollected - this._getTotalGoalUntilCurrentStage(stage)
      if (collectedFromCurrentStage <= 0) {
        return 0
      }
      if (collectedFromCurrentStage >= stage.goal || stage.goal === 0) {
        return 100
      }
      return Math.round((collectedFromCurrentStage * 100) / stage.goal)
    },
    getCompletedFundingDate (stage) {
      const goalToComplete = this._getTotalGoalUntilCurrentStage(stage) + stage.goal
      let goalCount = 0
      let completedFundingDate
      this.investors.forEach(investor => {
        goalCount += investor.investedAmount
        if (goalCount >= goalToComplete) {
          completedFundingDate = investor.dateOfInvestment
        }
      })
      return completedFundingDate
    },
    sortByCreatedDate (array) {
      const compare = (a, b) => {
        if (a.creationDate < b.creationDate) {
          return -1
        }
        if (a.creationDate > b.creationDate) {
          return 1
        }
        return 0
      }
      return array.sort(compare)
    }
  },

  mounted () {
    this.selected = this.currentStateIndex + 1
  }
}
</script>

<style scoped>
.color-stepper {
  background-color: rgba(211, 211, 211, 0.32);
}
</style>
