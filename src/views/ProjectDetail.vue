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
                      :value="seeder"
                      label="EMPRENDEDOR"
                      prepend-icon="mdi-account"
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
                  <v-col cols="6" class="px-2 py-2">
                    <v-select
                      v-model="project.currentState"
                      :items="[project.currentState]"
                      chips
                      label="ESTADO"
                      small-chips
                      prepend-icon="mdi-state-machine"
                      readonly
                      append-icon=""
                      class="my-0 py-0"
                    ></v-select>
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
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="project.investorCount"
                      label="PATROCINADORES"
                      prepend-icon="mdi-charity"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2">
                    <v-text-field
                      :value="project.favoriteCount"
                      label="FAVORITOS"
                      prepend-icon="mdi-star"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="px-2 py-2">
                    <v-select
                      v-model="mockProject.hashtags"
                      :items="mockProject.hashtags"
                      chips
                      label="HASHTAGS"
                      multiple
                      prepend-icon="mdi-pound"
                      readonly
                      append-icon=""
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider vertical class="my-2 vertical-divider"></v-divider>
              <v-col cols="6" class="mt-0 pt-0">
                <v-row no-gutters class="text-center">
                  <v-col cols="12" class="mt-2 mb-4">
                    <v-carousel hide-delimiters v-if="mockProject.photos.length !== 0">
                      <v-carousel-item
                        v-for="(item, i) in mockProject.photos"
                        :key="i"
                        :src="item.src"
                      ></v-carousel-item>
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
            <v-tab href="#tab-2">Patrocinadores</v-tab>
            <v-tab href="#tab-3">Veedores</v-tab>
          </v-tabs>

          <v-divider class="mx-7"></v-divider>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-timeline align-top dense>
                        <template v-for="state in mockProject.states">
                          <v-timeline-item
                            :key="state.name"
                            color="pink"
                          >
                            <v-row class="pt-1">
                              <v-col cols="3">
                                <strong>{{ state.dateTime }}</strong>
                              </v-col>
                              <v-col>
                                <strong>{{ state.name }}</strong>
                              </v-col>
                            </v-row>
                          </v-timeline-item>
                          <v-timeline-item
                            v-for="(stage, i) in state.stages"
                            :key="stage.name"
                            color="teal lighten-3"
                            small
                          >
                            <v-row class="pt-1">
                              <v-col cols="3">
                                <strong>{{ stage.dateTime }}</strong>
                              </v-col>
                              <v-col>
                                <strong>Etapa {{ i+1 }}</strong>
                                <div class="text-caption">
                                  Objetivo: {{ stage.goal }}
                                </div>
                              </v-col>
                            </v-row>
                          </v-timeline-item>
                        </template>
                      </v-timeline>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-text>
                  <InvestorsTable :projectId="parseInt(id)"></InvestorsTable>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-3">
              <v-card flat>
                <v-card-text>Veedores</v-card-text>
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
  </v-container>
</template>

<script>
import InvestorsTable from '@/components/InvestorsTable'
import { PROJECT_QUERY, BLOCK_PROJECT_MUTATION, UNBLOCK_PROJECT_MUTATION } from '@/graphql/graphql'

export default {
  components: {
    InvestorsTable
  },

  name: 'ProjectDetail',

  data: () => ({
    dialog: false,
    tab: null,
    ethToUsd: undefined,
    mockProject: {
      name: 'Nuevo Sistema de Gestión Universitaria (SIU Guaraní)',
      currentState: 'CREADO',
      goal: 1000000,
      investorsCount: 54,
      amountCollected: 3400,
      favs: 122,
      owner: {
        dbId: 1,
        name: 'mgarcia'
      },
      description: 'SIU GUARANÍ es un sistema de gestión académica que registra y administra todas las actividades académicas de la Universidad y sus Facultades, desde que los alumnos ingresan como aspirantes hasta que obtienen el diploma. Fue concebido para administrar la gestión de alumnos en forma segura.',
      creationDatetime: '06-05-2021 10:41',
      endDateTime: '07-01-2021 12:00',
      address: 'Av. Paseo Colón 850, Buenos Aires, Argentina',
      hashtags: ['guarani', 'university', 'admin', 'system', 'engineer', 'fiuba', 'uba', 'new', 'students', 'siu'],
      category: {
        name: 'Tecnología'
      },
      isBlocked: false,
      photos: [
        {
          src: 'https://mediacdn.cincopa.com/v2/1078304/12!xnaFAYJFrDwqiA/4/Asc3adeslaFIUBA_8_.jpg'
        },
        {
          src: 'https://mediacdn.cincopa.com/v2/1078304/6!xnaFAYJFrDAhEB/0/Asc3adeslaFIUBA_2_.JPG'
        }
      ],
      states: [
        {
          name: 'Iniciado',
          dateTime: '06-05-2021 10:41',
          stages: []
        },
        {
          name: 'En Progreso',
          dateTime: '07-05-2021 05:01',
          stages: [
            {
              dateTime: '07-05-2021 05:01',
              goal: '300000'
            },
            {
              dateTime: '12-05-2021 15:49',
              goal: '200000'
            },
            {
              dateTime: '28-05-2021 22:33',
              goal: '500000'
            }
          ]
        },
        {
          name: 'Finalizado',
          dateTime: '06-06-2021 10:10',
          stages: []
        }
      ]
    }
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
      const owner = this.project.owner
      const fullNameOrEmail = (owner.firstName && owner.lastName)
        ? `${owner.firstName} ${owner.lastName}`
        : owner.email
      return owner.username || fullNameOrEmail
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
</style>
