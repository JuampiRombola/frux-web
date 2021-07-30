<template>
  <v-container v-if="$apollo.queries.user.loading">
    <v-row style="height: 400px">
      <v-col class="text-center" align-self="center">
        <v-progress-circular indeterminate :size="100" :width="8" color="primary lighten-3" class="mt-5"></v-progress-circular>
      </v-col>
    </v-row>
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
            <v-row align="center">
              <v-col cols="3">
                <v-row no-gutters class="text-center">
                  <v-col cols="12" class="pt-6">
                    <v-avatar class="text-center" size="100">
                      <v-img
                        :src="require('@/assets/frux-logo.svg')"
                        alt="user avatar"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" class="mt-2 mb-4">
                    <div class="overline my-0">{{ getUserName(user) }}</div>
                    <div v-if="isSeeder"><v-chip small outlined class="my-1" color="green darken-2">Emprendedor</v-chip></div>
                    <div v-if="isSponsor"><v-chip small outlined class="my-1" color="pink darken-1">Patrocinador</v-chip></div>
                    <div v-if="isSeer"><v-chip small outlined class="my-1" color="amber darken-4">Veedor</v-chip></div>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider vertical class="my-2 vertical-divider"></v-divider>
              <v-col cols="9">
                <v-row no-gutters>
                  <v-col cols="12" class="my-0">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          :color="isBlocked ? 'red darken-1' : 'grey darken-1'"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          small
                          class="float-right"
                          @click="dialog = true"
                        >
                          <v-icon left>mdi-cancel</v-icon>
                          {{ isBlocked ? 'Desbloquear' : 'Bloquear' }}
                        </v-btn>
                      </template>
                      <span>{{ isBlocked ? 'Desbloquear usuario' : 'Bloquear usuario' }}</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="2" class="px-2">
                    <v-text-field
                      :value="id"
                      label="ID USUARIO"
                      prepend-icon="mdi-identifier"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" class="px-2">
                    <v-text-field
                      :value="user.email"
                      label="EMAIL"
                      prepend-icon="mdi-email"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="user.username"
                      label="NOMBRE"
                      prepend-icon="mdi-account"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="user.lastName"
                      label="APELLIDO"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="px-2 py-2">
                    <v-text-field
                      :value="getFormattedDate(user.creationDateTime)"
                      label="FECHA DE CREACIÓN"
                      prepend-icon="mdi-calendar-plus"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="px-0 mx-0"></v-divider>

                <v-row no-gutters class="mt-7">
                  <v-col cols="8" class="px-2 py-2">
                    <v-text-field
                      :value="walletAddress"
                      label="Billetera"
                      prepend-icon="mdi-wallet"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="px-2 py-2">
                    <v-text-field
                      :value="walletBalance"
                      :label="getEthOrUsdText()"
                      :prepend-icon="getEthOrUsdIcon()"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card class="mt-3">
          <v-tabs v-model="tab" centered color="primary lighten-3">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">Perfil</v-tab>
            <v-tab href="#tab-2" v-if="isSeeder">Emprendedor</v-tab>
            <v-tab href="#tab-3" v-if="isSponsor">Patrocinador</v-tab>
            <v-tab href="#tab-4" v-if="isSeer">Veedor</v-tab>
          </v-tabs>

          <v-divider class="mx-7"></v-divider>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Descripción</v-card-title>
                          <v-card-text>{{ user.description }}</v-card-text>
                        </v-col>
                        <v-col cols="12" class="mt-0 pt-0" v-if="user.latitude && user.longitude">
                          <v-card-title>Ubicación</v-card-title>
                          <Map :latitude="parseFloat(user.latitude)" :longitude="parseFloat(user.longitude)" class="px-4"></Map>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-divider vertical class="my-2 vertical-divider"></v-divider>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Intereses</v-card-title>
                          <v-card-text>
                            <v-chip
                              v-for="item in interests"
                              :key="item"
                              outlined
                              class="mb-2 mr-2"
                            >
                              {{ item }}
                            </v-chip>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Proyectos Favoritos <span class=" ml-1 caption">({{ user.favoriteCount }})</span></v-card-title>
                          <v-card-text>
                            <FavoritedProjects :items="favorites"></FavoritedProjects>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0" v-if="reviews.length">
                          <v-card-title>
                            Opiniones del Usuario
                            <span class=" ml-1 caption">({{ reviews.length }})</span>
                            <v-rating
                              :value="averageScore"
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="14"
                              class="ml-1"
                            ></v-rating>
                          </v-card-title>
                          <v-card-text>
                            <UserReviews :items="reviews"></UserReviews>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2" v-if="isSeeder">
              <v-card flat>
                <v-card-title>Proyectos Creados <span class=" ml-1 caption">({{ created && created.length || '-' }})</span></v-card-title>
                <v-card-text>
                  <CreatedProjects :items="created"></CreatedProjects>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-3" v-if="isSponsor">
              <v-card flat>
                <v-card-title>Proyectos Patrocinados <span class=" ml-1 caption">({{ investmentProjects && investmentProjects.length || '-' }})</span></v-card-title>
                <v-card-text>
                  <InvestedProjects :items="investmentProjects"></InvestedProjects>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-4" v-if="isSeer">
              <v-card flat>
                <v-card-title>Proyectos Supervisados <span class=" ml-1 caption">({{ seerProjects && seerProjects.length || '-' }})</span></v-card-title>
                <v-card-text>
                  <SeerProjects :items="seerProjects"></SeerProjects>
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
            {{ isBlocked ? 'Desbloquear usuario' : 'Bloquear usuario' }}
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
              @click="isBlocked ? unblockUser() : blockUser()"
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
import Map from '@/components/Map'
import { BLOCK_USER_MUTATION, UNBLOCK_USER_MUTATION, USER_QUERY } from '@/graphql/graphql'
import FavoritedProjects from '@/components/FavoritedProjects'
import CreatedProjects from '@/components/CreatedProjects'
import InvestedProjects from '@/components/InvestedProjects'
import SeerProjects from '@/components/SeerProjects'
import UserReviews from '@/components/UserReviews'
import common from '@/mixins/common'

export default {
  mixins: [common],

  components: {
    Map,
    FavoritedProjects,
    CreatedProjects,
    InvestedProjects,
    SeerProjects,
    UserReviews
  },

  name: 'UserDetail',

  data: () => ({
    dialog: false,
    tab: null
  }),

  computed: {
    id () {
      return this.$route.params.id
    },
    isBlocked () {
      return this.user.isBlocked
    },
    isSeeder () {
      return this.user.isSeeder
    },
    isSponsor () {
      return this.user.isSponsor
    },
    isSeer () {
      return this.user.isSeer
    },
    lastLogin () {
      return this.user.lastLogin || 'Sin datos'
    },
    interests () {
      return this.user?.interests?.edges?.map(i => i?.node?.name) || []
    },
    favorites () {
      return this.user?.favoritedProjects?.edges?.map(i => i?.node.project) || []
    },
    created () {
      return this.user?.createdProjects?.edges?.map(i => i?.node) || []
    },
    investmentProjects () {
      return this.user?.projectInvestments?.edges?.map(i => this.flattenObject(i.node)) || []
    },
    seerProjects () {
      return this.user?.seerProjects?.edges?.map(i => i.node) || []
    },
    reviews () {
      return this.user?.reviews?.edges?.map(i => this.flattenObject(i.node)) || []
    },
    averageScore () {
      if (!this.reviews.length) {
        return 0
      }
      return Math.round(this.reviews.reduce((acc, review) => acc + review?.generalScore, 0) / this.reviews.length)
    },
    walletAddress () {
      return this.user?.wallet?.address
    },
    walletBalance () {
      return this.getEthOrUsd(this.user?.wallet?.balance)
    },
    items () {
      return [{
        text: 'Usuarios',
        disabled: false,
        href: '../users'
      },
      {
        text: this.user.username,
        disabled: true
      }]
    }
  },

  methods: {
    blockUser () {
      this.dialog = false
      this.$apollo.mutate({
        mutation: BLOCK_USER_MUTATION,
        variables: {
          userId: this.id
        }
      }).then(() => {
        this.user.isBlocked = true
      }).catch((error) => {
        console.error(error)
      })
    },
    unblockUser () {
      this.dialog = false
      this.$apollo.mutate({
        mutation: UNBLOCK_USER_MUTATION,
        variables: {
          userId: this.id
        }
      }).then(() => {
        this.user.isBlocked = false
      }).catch((error) => {
        console.error(error)
      })
    },
    flattenObject (obj) {
      const flattened = {}

      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, this.flattenObject(obj[key]))
        } else {
          flattened[key] = obj[key]
        }
      })

      return flattened
    }
  },

  apollo: {
    user: {
      query: USER_QUERY,
      variables () {
        return {
          id: this.id
        }
      }
    }
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
