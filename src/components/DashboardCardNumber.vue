<template>
  <v-card class="mt-7 mx-auto">
    <v-row>
      <v-col class="text-center mb-0 pb-0" cols="4">
        <v-sheet
          class="v-sheet--offset ml-3"
          height="88"
          width="88"
          rounded
          :color="color"
          elevation="12"
          max-width="auto"
        >
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-col class="text-center">
                <v-icon x-large color="white">{{ icon }}</v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col cols="8" class="mb-0 pb-0">
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2 text-center text-no-wrap">
            {{ title }}
          </div>
          <div class="headline font-weight-medium grey--text text-center">
            {{ quantity }}
          </div>
        </v-card-text>
      </v-col>
      <v-col cols="12" class="mt-0 pt-0">
        <v-card-text class="py-0">
          <v-divider class="my-2"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="caption grey--text font-weight-light">{{ captionText }}</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'DashboardCardNumber',

  props: {
    title: {
      type: String
    },
    quantity: {
      type: String
    },
    icon: {
      type: String
    },
    captionText: {
      type: String
    },
    color: {
      type: String
    }
  },

  data: () => ({})
}
</script>

<style scoped>
.v-sheet--offset {
  top: -20px;
  position: relative;
}
</style>
