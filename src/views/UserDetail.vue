<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-sheet :color="isBlocked ? 'red darken-1' : 'blue darken-1'" height="6"></v-sheet>
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
                    <div v-show="isSeeder"><v-chip small outlined class="my-1" color="green darken-2">Emprendedor</v-chip></div>
                    <div v-show="isSponsor"><v-chip small outlined class="my-1" color="pink darken-2">Patrocinador</v-chip></div>
                    <div v-show="isSeer"><v-chip small outlined class="my-1" color="amber darken-4">Veedor</v-chip></div>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserDetail',

  data: () => ({
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
      latitude: '-34.5971806',
      longitude: '-58.4432835',
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
