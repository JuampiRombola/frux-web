<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-sheet :color="isBlocked ? 'red darken-1' : 'blue darken-1'" height="6"></v-sheet>
          <v-container fill-height fluid>
            <v-row>
              <v-col cols="3">
                <v-row no-gutters class="text-center">
                  <v-col cols="12" class="pt-6">
                    <v-avatar class="text-center" size="120">
                      <v-img
                        :src="require('@/assets/frux-logo.svg')"
                        alt="user avatar"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" class="mt-2 mb-4">
                    <div class="overline my-0">{{ user.username }}</div>
                    <div class="caption">{{ user.firstName }} {{ user.lastName }}</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider vertical class="my-2 vertical-divider"></v-divider>
              <v-col cols="9">
                asd
                <v-divider class="px-0 mx-0"></v-divider>
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
      mail: 'mgarcia@gmail.com',
      avatar: 0,
      firstName: 'Manuel',
      lastName: 'García',
      description: 'Divulgador científico, blogger y amante de la fotografía.',
      creationDatetime: '12-04-2021 18:41',
      lastSeen: '25-05-2021 10:12',
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
