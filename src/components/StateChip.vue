<template>
  <v-chip :color="color" :small="isSmall" outlined>{{ state }}</v-chip>
</template>

<script>
export default {
  props: {
    state: String,
    isSmall: {
      type: Boolean,
      default: true
    },
    withColor: {
      type: Boolean,
      default: true
    }
  },

  name: 'StateChip',

  computed: {
    color () {
      if (!this.withColor) {
        return 'grey'
      }
      if (this.state === 'CREATED') {
        return 'pink'
      }
      if (this.state === 'FUNDING') {
        return 'blue'
      }
      if (this.state === 'IN_PROGRESS') {
        return 'amber darken-1'
      }
      if (this.state === 'COMPLETE') {
        return 'green'
      }
      if (this.state === 'CANCELED') {
        return 'red'
      }
      return 'grey'
    }
  }
}
</script>

<style scoped>

</style>
