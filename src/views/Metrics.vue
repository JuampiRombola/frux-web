<template>
  <div>
    <v-container v-if="loading">
      <v-row style="height: 400px">
        <v-col class="text-center" align-self="center">
          <v-progress-circular indeterminate :size="100" :width="8" color="primary lighten-3" class="mt-5"></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <div class="iframe-content" v-show="!loading">
      <iframe
        src="https://p.datadoghq.com/sb/1f4ff3ee-bcb9-11eb-a478-da7ad0900002-cdf8903be7f6f7d0787e3a6d4dfe8807"
        width="80%"
        @load="loadingOff"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Metrics',

  data: () => ({
    loading: true
  }),

  methods: {
    loadingOff () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
iframe {
  display: block;
  border: none;         /* Reset default border */
  height: 100vh;        /* Viewport-relative units */
  width: calc(100% + 17px);
}
.iframe-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
