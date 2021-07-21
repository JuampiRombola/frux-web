<template>
  <v-card>
    <v-img
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ server.name }}</v-card-title>

    <v-card-text>
      <div class="text-subtitle-2 mb-2">
        Fecha de creación: {{ server.creationDate }}
      </div>

      <div>{{ server.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn color="primary" block text>
        Ping
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ServerCard',

  props: {
    server: Object
  }
}
</script>

<style scoped>

</style>
