<template>
  <v-container>
    <v-breadcrumbs
      :items="items"
      class="mx-0 px-0"
    ></v-breadcrumbs>
    <v-row>
      <v-col>
        <v-card>
          <v-sheet :color="isBlocked ? 'red lighten-2' : 'primary lighten-4'" height="6"></v-sheet>
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
                    <div class="overline my-0">{{ user.username }}</div>
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
                          color="red darken-3"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          icon
                          small
                          class="float-right"
                          @click="isBlocked ? unblockUser() : blockUser()"
                        >
                          <v-icon dark>
                            {{ isBlocked ? 'mdi-lock' : 'mdi-lock-open' }}
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>{{ isBlocked ? 'Desbloquear usuario' : 'Bloquear usuario' }}</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="2" class="px-2">
                    <v-text-field
                      :value="id"
                      label="USER ID"
                      prepend-icon="mdi-tag"
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
                      :value="user.firstName"
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
                      prepend-icon="mdi-account"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="px-0 mx-0"></v-divider>

                <v-row no-gutters class="mt-7">
                  <v-col cols="8" class="px-2 py-2">
                    <v-text-field
                      :value="user.address"
                      label="UBICACIÓN"
                      prepend-icon="mdi-map-marker"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="px-2 py-2">
                    <v-text-field
                      :value="user.phone"
                      label="TELÉFONO"
                      prepend-icon="mdi-phone"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="user.creationDatetime"
                      label="FECHA DE CREACIÓN"
                      prepend-icon="mdi-calendar-plus"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="px-2 py-2">
                    <v-text-field
                      :value="user.lastLogin"
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
                    <v-col lg="12" xl="6">
                      <v-row>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Descripción</v-card-title>
                          <v-card-text>{{ user.description }}</v-card-text>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0">
                          <v-card-title>Intereses</v-card-title>
                          <v-card-text>
                            <v-chip
                              v-for="item in user.interests"
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
                          <Map :latitude="user.latitude" :longitude="user.longitude" class="px-4"></Map>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-divider vertical class="my-2 vertical-divider"></v-divider>
                    <v-col lg="12" xl="6">
                      <v-row>
                        <v-col cols="12" class="mt-0 pt-0">
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
  </v-container>
</template>

<script>
import Map from '@/components/Map'
import ProjectsTable from '@/components/ProjectsTable'

export default {
  components: {
    Map,
    ProjectsTable
  },

  name: 'UserDetail',

  data: () => ({
    tab: null,
    user: {
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
      this.user.isBlocked = true
    },
    unblockUser () {
      this.user.isBlocked = false
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
