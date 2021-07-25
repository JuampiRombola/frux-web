<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar color="grey lighten-2">
      <v-toolbar-title>Opiniones</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="cancelCallback">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <template v-for="(review, index) in reviews">
        <v-list-item :key="review.id">
            <v-list-item-content>
              <v-rating
                :value="review.score"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                class="mx-0 px-0 move-to-left"
              ></v-rating>
              <v-list-item-subtitle class="text--primary my-1" v-text="review.username" />
              <v-list-item-subtitle v-text="review.description" />
            </v-list-item-content>
        </v-list-item>

        <v-divider
          v-if="index < reviews.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    cancelCallback: {
      type: Function
    },
    reviews: {
      type: Array,
      default: () => []
    }
  },

  name: 'Reviews',

  data: () => ({
  }),

  methods: {
    getAuthorTitle (user) {
      return `Autor: ${user}`
    }
  }
}
</script>

<style scoped>
.move-to-left {
  margin-left: -2px !important;
}
</style>
