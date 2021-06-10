<template>
  <v-container v-if="loading">
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
                    <div class="overline my-0">{{ mockUser.username }}</div>
                    <div v-if="isSeeder"><v-chip small outlined class="my-1" color="green darken-2">Emprendedor</v-chip></div>
                    <div v-if="isSponsor"><v-chip small outlined class="my-1" color="pink darken-2">Patrocinador</v-chip></div>
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
                      label="USER ID"
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
                      :value="user.name"
                      label="NOMBRE"
                      prepend-icon="mdi-account"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="mockUser.lastName"
                      label="APELLIDO"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="px-0 mx-0"></v-divider>

                <v-row no-gutters class="mt-7">
                  <v-col cols="8" class="px-2 py-2">
                    <v-text-field
                      :value="mockUser.address"
                      label="DIRECCIÓN"
                      prepend-icon="mdi-map-marker"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="px-2 py-2">
                    <v-text-field
                      :value="mockUser.phone"
                      label="TELÉFONO"
                      prepend-icon="mdi-phone"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="mockUser.creationDatetime"
                      label="FECHA DE CREACIÓN"
                      prepend-icon="mdi-calendar-plus"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="mockUser.lastLogin"
                      label="ÚLTIMA CONEXIÓN"
                      prepend-icon="mdi-update"
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
            <v-tab href="#tab-2">Transacciones</v-tab>
            <v-tab href="#tab-3" v-if="isSeeder">Emprendedor</v-tab>
            <v-tab href="#tab-4" v-if="isSponsor">Patrocinador</v-tab>
            <v-tab href="#tab-5" v-if="isSeer">Veedor</v-tab>
          </v-tabs>

          <v-divider class="mx-7"></v-divider>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <v-card flat>
                <v-container>
                  <v-row>
                    <v-col cols="12" xl="6">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Descripción</v-card-title>
                          <v-card-text>{{ mockUser.description }}</v-card-text>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Intereses</v-card-title>
                          <v-card-text>
                            <v-chip
                              v-for="item in mockUser.interests"
                              :key="item"
                              outlined
                              class="mb-2 mr-2"
                            >
                              {{ item }}
                            </v-chip>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" class="mt-0 pt-0" v-if="user.latitude && user.longitude">
                          <v-card-title>Ubicación</v-card-title>
                          <Map :latitude="parseFloat(user.latitude)" :longitude="parseFloat(user.longitude)" class="px-4"></Map>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-divider vertical class="my-2 vertical-divider"></v-divider>
                    <v-col cols="12" xl="6">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Proyectos Favoritos</v-card-title>
                          <v-card-text>
                            <ProjectsTable :itemsPerPage="3"></ProjectsTable>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Proyectos Consultados</v-card-title>
                          <v-card-text>
                            <ProjectsTable :itemsPerPage="3"></ProjectsTable>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-2">
              <v-card flat>
                <v-card-text>Transacciones</v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-3" v-if="isSeeder">
              <v-card flat>
                <v-card-text>Emprendedor</v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-4" v-if="isSponsor">
              <v-card flat>
                <v-card-text>Patrocinador</v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item value="tab-5" v-if="isSeer">
              <v-card flat>
                <v-card-text>Veedor</v-card-text>
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
import ProjectsTable from '@/components/ProjectsTable'
import { USER_QUERY } from '../graphql/graphql'

export default {
  components: {
    Map,
    ProjectsTable
  },

  name: 'UserDetail',

  data: () => ({
    dialog: false,
    tab: null,
    mockUser: {
      username: 'mgarcia',
      email: 'mgarcia@gmail.com',
      avatar: 0,
      firstName: 'Manuel',
      lastName: 'García',
      description: 'Divulgador científico, blogger y amante de la fotografía.',
      creationDatetime: '12-04-2021 18:41',
      lastLogin: '25-05-2021 10:12',
      isSeeder: true,
      isSponsor: true,
      isSeer: true,
      address: 'Av. Corrientes 5530, Buenos Aires, Argentina',
      latitude: -34.5971806,
      longitude: -58.4432835,
      phone: '+54 9 11 3271 8283',
      interests: ['Arte', 'Ciencia', 'Cine', 'Comida', 'Fotografía', 'Moda', 'Música', 'Tecnología', 'Teatro'],
      isBlocked: false
    }
  }),

  computed: {
    id () {
      return this.$route.params.id
    },
    isBlocked () {
      return this.mockUser.isBlocked
    },
    isSeeder () {
      return this.mockUser.isSeeder
    },
    isSponsor () {
      return this.mockUser.isSponsor
    },
    isSeer () {
      return this.mockUser.isSeer
    },
    items () {
      return [{
        text: 'Usuarios',
        disabled: false,
        href: '../users'
      },
      {
        text: this.mockUser.username,
        disabled: true
      }]
    },
    loading () {
      return this.user === undefined
    }
  },

  methods: {
    blockUser () {
      this.mockUser.isBlocked = true
      this.dialog = false
    },
    unblockUser () {
      this.mockUser.isBlocked = false
      this.dialog = false
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
