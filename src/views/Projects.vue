<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>Proyectos</v-card-title>
          <v-card-text>
            <ProjectsTable class="elevation-1"></ProjectsTable>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectsTable from '@/components/ProjectsTable'

export default {
  components: {
    ProjectsTable
  },

  name: 'Projects'
}
</script>
