<template>
  <v-card
    class="mx-auto"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      :color="color"
      elevation="12"
      rounded
      max-width="calc(100% - 32px)"
    >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon color="white">{{ server.icon }}</v-icon>
        <v-card-title class="white--text overline my-0" style="font-size: 14px !important;">{{ server.name }}</v-card-title>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light my-2 px-2">
        Creado el {{ server.creationDate }}
      </div>
      <div class="subheading font-weight-light grey--text px-2" style="min-height: 75px">
        {{ server.description }}
      </div>
      <v-divider class="my-2"></v-divider>
      <v-card-actions>
        <v-icon class="mr-2" small :color="statusColor">
          mdi-checkbox-blank-circle
        </v-icon>
        <v-progress-circular :size="13" width="1" indeterminate color="grey" class="mr-1" v-if="loading"></v-progress-circular>
        <span class="grey--text font-weight-light" v-if="!loading && ok">{{ responseTimeMS }} ms</span>
        <span class="grey--text font-weight-light" v-if="!loading && error">No se pudo conectar con el servicio</span>
        <v-spacer></v-spacer>
        <v-btn small color="primary lighten-2" dark @click="pingServer()">Ping</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ServerCard',

  props: {
    server: Object,
    color: {
      type: String,
      default: 'grey darken-1'
    }
  },

  data: () => ({
    ok: false,
    loading: true,
    error: false,
    responseTimeMS: 0
  }),

  computed: {
    statusColor () {
      if (!this.ok && !this.error) {
        return 'amber'
      }
      return this.ok ? 'green' : 'red'
    }
  },

  methods: {
    pingServer () {
      const startTime = new Date()
      this.loading = true
      this.axios
        .get(this.server.healthUrl)
        .then(data => {
          const endTime = new Date()
          this.responseTimeMS = endTime - startTime
          this.ok = this.responseIsOk(data)
          this.error = !this.ok
          this.loading = false
        })
        .catch(() => {
          this.ok = false
          this.error = true
          this.loading = false
        })
    },

    responseIsOk (data) {
      return data.statusText === 'OK'
    }
  },

  mounted () {
    this.pingServer()
  }
}
</script>

<style scoped>
.v-sheet--offset {
  top: -10px;
  position: relative;
}
</style>
