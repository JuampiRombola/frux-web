<template>
  <v-card class="mx-auto">
    <v-row>
      <v-col class="text-center mb-0 pb-0" cols="2">
        <v-row justify="center">
          <v-col cols="2">
            <v-sheet
              class="v-sheet--offset text-center"
              height="80"
              width="80"
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
        </v-row>
      </v-col>
      <v-col cols="10" class="mb-0 pb-0 text-center">
        <v-card-text class="pt-0">
          <div class="overline grey--text" style="font-size: 15px !important;">
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
          <span class="caption grey--text font-weight-light">{{ caption }}</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ResizeText from 'vue-resize-text'

export default {
  name: 'DashboardCardNumber',

  directives: {
    ResizeText
  },

  props: {
    title: {
      type: String
    },
    quantity: {
      type: Number
    },
    icon: {
      type: String
    },
    caption: {
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
.title-color {
  color: #7d7b7b;
}
</style>
