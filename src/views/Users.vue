<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>Usuarios</v-card-title>
          <v-card-text>
            <UsersTable></UsersTable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersTable from '@/components/UsersTable'

export default {
  components: {
    UsersTable
  },

  name: 'Users'
}
</script>
