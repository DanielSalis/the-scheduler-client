<template>
  <gContainer class="admin-schedules-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Dimensionamentos</v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab>
          <v-icon left>
            mdi-table
          </v-icon>
          Listar
        </v-tab>


        <v-tab-item>
          <schedulesList
            v-if="schedulesData && schedulesData.length"
            :headers="headers"
            :schedules="schedulesData"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import schedulesList from '~/components/schedule/schedule-list.vue';
  export default {
    name: "AdminSchedulePage",
    components: {
      gContainer,
      schedulesList,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        schedulesData: null
      }
    },
    async fetch(){
      const response = await this.$axios.get('/schedule/getAll')
      this.schedulesData = response.data
    },
    computed: {
      headers(){
        const headersData = [
          {
            text: "id",
            value: 'id'
          },
          {
            text: "Dia de operação (ano-mes-dia)",
            value: 'operational_day'
          },
          {
            text: "Carga de trabalho (min)",
            value: "workload"
          },
          {
            text: "Responsável",
            value: "user.name"
          },
          {
            text: "Unidade",
            value: "unity.name"
          },
          {
            text: "Turno",
            value: "shift.name"
          },
          {
            text: "Cancelado",
            value: 'cancelled'
          },
          {
            text: 'Ações',
            value: 'actions',
            sortable: false
          }
        ]
        return headersData
      }
    }
  }
</script>

<style lang="scss" scoped>
.admin-schedules-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>