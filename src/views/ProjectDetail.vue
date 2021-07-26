<template>
  <v-container v-if="$apollo.queries.project.loading">
    <v-layout row justify-center>
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <v-progress-circular indeterminate :size="70" :width="5" color="primary lighten-3" class="mt-5"></v-progress-circular>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
  <v-container v-else>
    <v-card-actions class="mx-0 px-0 mt-0 pt-0">
      <v-btn icon class="pa-0 ma-0" @click="$router.back()"><v-icon color="primary lighten-3">mdi-keyboard-backspace</v-icon></v-btn>
      <v-breadcrumbs
        class="my-0 py-0"
        :items="items"
      ></v-breadcrumbs>
    </v-card-actions>
    <v-row>
      <v-col>
        <v-card>
          <v-sheet :color="isBlocked ? 'red darken-1' : 'primary lighten-4'" height="6"></v-sheet>
          <v-container fill-height fluid>
            <v-row align="center" no-gutters class="my-3">
              <v-col cols="12" class="my-0">
                <div class="display-1 pb-0 mb-0 mt-2 text-center px-4">
                  {{ project.name }}
                  <v-chip small class="ml-2">{{ project.currentState }}</v-chip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :color="isBlocked ? 'red darken-1' : 'grey darken-1'"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        small
                        class="float-right mt-2"
                        @click="dialog = true"
                      >
                        <v-icon left>mdi-cancel</v-icon>
                        {{ isBlocked ? 'Desbloquear' : 'Bloquear' }}
                      </v-btn>
                    </template>
                    <span>{{ isBlocked ? 'Desbloquear proyecto' : 'Bloquear proyecto' }}</span>
                  </v-tooltip>
                </div>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="9" offset="1">
                    <v-card-text class="text-center">{{ project.description }}</v-card-text>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row align="top" justify="center" class="mt-0 pt-0">
              <v-col cols="6">
                <v-row class="px-2">
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="id"
                      label="PROJECT ID"
                      prepend-icon="mdi-identifier"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="project.category.name"
                      label="CATEGORÍA"
                      prepend-icon="mdi-tag"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="seeder"
                      label="EMPRENDEDOR"
                      prepend-icon="mdi-account"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="seer"
                      label="VEEDOR"
                      prepend-icon="mdi-account"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="creationDate"
                      label="FECHA DE CREACIÓN"
                      prepend-icon="mdi-calendar-plus"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="deadline"
                      label="FECHA DE FINALIZACIÓN"
                      prepend-icon="mdi-calendar-remove"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="amountCollected"
                      label="RECAUDADO"
                      prepend-icon="mdi-account-cash"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="goal"
                      label="OBJETIVO"
                      prepend-icon="mdi-cash"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="px-2 py-2">
                    <v-text-field
                      :value="project.smartContractHash"
                      label="SMART CONTRACT HASH"
                      prepend-icon="mdi-wallet"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="px-2 py-2">
                    <v-select
                      v-model="hashtags"
                      :items="hashtags"
                      chips
                      label="HASHTAGS"
                      multiple
                      prepend-icon="mdi-pound"
                      readonly
                      append-icon=""
                    ></v-select>
                  </v-col>
                  <v-col cols="6" xl="3" class="px-2">
                    <v-text-field
                      :value="project.investorCount"
                      label="PATROCINADORES"
                      prepend-icon="mdi-charity"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" xl="3" class="px-2">
                    <v-text-field
                      :value="project.favoriteCount"
                      label="FAVORITOS"
                      prepend-icon="mdi-heart"
                      readonly
                      dense
                    >
                      <template v-slot:append v-if="project.favoriteCount >= 1">
                        <v-btn small icon @click="favDialog = true" class="ma-0 pa-0">
                          <v-icon color="primary lighten-3">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" xl="6" class="px-2">
                    <v-text-field
                      :value="project.generalScore"
                      label="PUNTAJE"
                      prepend-icon="mdi-star"
                      readonly
                      dense
                    >
                      <template v-slot:append>
                        <v-card-actions class="ma-0 pa-0 pr-2">
                          <v-rating
                            :value="project.generalScore"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                            class="mr-1"
                          ></v-rating>
                          <div class="blue--text point-mouse small-font" v-if="project.reviewCount" @click="reviewsDialog = true">{{ reviewsText }}</div>
                        </v-card-actions>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider vertical class="my-2 vertical-divider"></v-divider>
              <v-col cols="6" class="mt-0 pt-0">
                <v-row no-gutters class="text-center">
                  <v-col cols="12" class="mt-2 mb-4">
                    <v-carousel hide-delimiters v-if="project.signedUrl" :show-arrows="false">
                      <v-carousel-item :src="project.signedUrl"></v-carousel-item>
                    </v-carousel>
                    <v-carousel v-else hide-delimiter-background hide-delimiters :show-arrows="false">
                      <v-carousel-item>
                        <v-sheet color="grey" height="100%" tile>
                          <v-row class="fill-height" align="center" justify="center">
                            <div class="text-h2">Sin imágenes</div>
                          </v-row>
                        </v-sheet>
                      </v-carousel-item>
                    </v-carousel>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card class="mt-3">
          <v-tabs v-model="tab" centered color="primary lighten-3">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">Etapas</v-tab>
            <v-tab href="#tab-2" v-if="!currentStateIsCreated">Patrocinadores</v-tab>
          </v-tabs>

          <v-divider class="mx-7"></v-divider>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <ProjectStages
                    :stages="stages"
                    :eth-and-usd-text="ethAndUsdText"
                    :get-formatted-date="getFormattedDate"
                    :current-state="project.currentState"
                    :amountCollected="project.amountCollected"
                    :investors="investors"
                  ></ProjectStages>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2" v-if="!currentStateIsCreated">
              <v-card flat>
                <v-card-text>
                  <InvestorsTable :projectId="parseInt(id)" :eth-to-usd="ethToUsd"></InvestorsTable>
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="300"
      >
        <v-card>
          <div class="title grey lighten-2 text-center py-1 ">Confirmación</div>
          <v-divider></v-divider>
          <v-card-text class="mt-5 text-center">
            <v-icon left size="20" color="primary lighten-2">mdi-help-circle</v-icon>
            {{ isBlocked ? 'Desbloquear proyecto' : 'Bloquear proyecto' }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="grey darken-1"
              text
              @click="dialog = false"
            >
              Volver
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary lighten-2"
              text
              @click="isBlocked ? unblockProject() : blockProject()"
            >
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="favDialog" width="400">
      <ProjectFavs :cancel-callback="closeFavsDialog" :users="favorites" />
    </v-dialog>
    <v-dialog v-model="reviewsDialog" width="600">
      <Reviews :cancel-callback="closeReviewsDialog" :reviews="reviews" />
    </v-dialog>
  </v-container>
</template>

<script>
import InvestorsTable from '@/components/InvestorsTable'
import { PROJECT_QUERY, BLOCK_PROJECT_MUTATION, UNBLOCK_PROJECT_MUTATION } from '@/graphql/graphql'
import ProjectFavs from '@/components/ProjectFavs'
import Reviews from '@/components/Reviews'
import ProjectStages from '@/components/ProjectStages'

export default {
  components: {
    InvestorsTable,
    ProjectFavs,
    Reviews,
    ProjectStages
  },

  name: 'ProjectDetail',

  data: () => ({
    dialog: false,
    favDialog: false,
    reviewsDialog: false,
    tab: null,
    ethToUsd: undefined
  }),

  computed: {
    id () {
      return this.$route.params.id
    },
    isBlocked () {
      return this.project.isBlocked
    },
    items () {
      return [{
        text: 'Proyectos',
        disabled: false,
        href: '../projects'
      },
      {
        text: this.id,
        disabled: true
      }]
    },
    seeder () {
      return this.getUserName(this.project.owner)
    },
    seer () {
      return this.project.hasSeer ? this.getUserName(this.project.seer) : 'Sin asignar'
    },
    creationDate () {
      return this.getFormattedDate(this.project.creationDate)
    },
    deadline () {
      return this.getFormattedDate(this.project.deadline)
    },
    amountCollected () {
      return this.ethAndUsdText(this.project.amountCollected)
    },
    goal () {
      return this.ethAndUsdText(this.project.goal)
    },
    hashtags () {
      return this.project.hashtags.edges.map(e => e.node.hashtag)
    },
    stages () {
      return this.project.stages.edges.map(e => e.node)
    },
    reviewsText () {
      return `(${this.project.reviewCount} ${this.project.reviewCount === 1 ? 'opinión' : 'opiniones'})`
    },
    favorites () {
      return this.project.favoritesFrom.edges.map(e => ({ dbId: e.node.user.dbId, username: this.getUserName(e.node.user) }))
    },
    reviews () {
      return this.project.reviews.edges.map(e => {
        e.node.username = this.getUserName(e.node.user)
        return e.node
      })
    },
    investors () {
      return this.project.investors.edges.map(e => e.node)
    },
    currentStateIsCreated () {
      return this.project.currentState === 'CREATED'
    }
  },

  methods: {
    blockProject () {
      this.dialog = false
      this.$apollo.mutate({
        mutation: BLOCK_PROJECT_MUTATION,
        variables: {
          idProject: this.id
        }
      }).then(() => {
        this.project.isBlocked = true
      }).catch((error) => {
        console.error(error)
      })
    },
    unblockProject () {
      this.dialog = false
      this.$apollo.mutate({
        mutation: UNBLOCK_PROJECT_MUTATION,
        variables: {
          idProject: this.id
        }
      }).then(() => {
        this.project.isBlocked = false
      }).catch((error) => {
        console.error(error)
      })
    },
    getUserName (user) {
      const fullNameOrEmail = (user.firstName && user.lastName)
        ? `${user.firstName} ${user.lastName}`
        : user.email
      return user.username || fullNameOrEmail
    },
    getFormattedDate (rawDate) {
      const date = new Date(rawDate)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    },
    ethAndUsdText (amount) {
      const formattedAmount = parseFloat(amount).toFixed(4)
      if (!this.ethToUsd) {
        return `${formattedAmount} ETH`
      }
      const usd = Math.round(amount * this.ethToUsd)
      return `${usd} USD  (${formattedAmount} ETH)`
    },
    closeFavsDialog () {
      this.favDialog = false
    },
    closeReviewsDialog () {
      this.reviewsDialog = false
    }
  },

  apollo: {
    project: {
      query: PROJECT_QUERY,
      variables () {
        return {
          id: this.id
        }
      }
    }
  },

  mounted () {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      .then(response => response.json()).then(jsonData => {
        this.ethToUsd = jsonData.USD
      })
  }
}
</script>

<style scoped>
.v-sheet {
  border-bottom-right-radius: unset;
  border-bottom-left-radius: unset;
}
.vertical-divider {
  margin: 0 -1px;
}
.point-mouse:hover {
  cursor: pointer;
}
.small-font {
  font-size: small;
  white-space: nowrap;
}
</style>
