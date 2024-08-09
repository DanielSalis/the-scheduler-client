<template>
  <gContainer class="admin-companies-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Hospitais</v-toolbar-title>
      </v-toolbar>
      <v-tabs>
        <v-tab>
          <v-icon left>
            mdi-table
          </v-icon>
          Listar
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-plus
          </v-icon>
          Adicionar
        </v-tab>

        <v-tab-item>
          <hospitalsList
            v-if="hospitalsData && hospitalsData.length"
            :headers="headers"
            :hospitals="hospitalsData"
          />
        </v-tab-item>
        <v-tab-item>
          <hospitalsAdd />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import hospitalsList from '~/components/hospitals/hospitals-list.vue';
  import hospitalsAdd from '~/components/hospitals/hospitals-add.vue';
  export default {
    name: "AdminHospitalsPage",
    components: {
      gContainer,
      hospitalsList,
      hospitalsAdd,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        hospitalsData: null
      }
    },
    async fetch(){
      const response = await this.$axios.get('/hospital/getAll')
      this.hospitalsData = response.data
    },
    computed: {
      headers(){
        const headersData = [
          {
            text: "id",
            value: 'id'
          },
          {
            text: "Nome",
            value: 'name'
          },
          {
            text: "Endereço",
            value: 'address'
          },
          {
            text: "Rede hospitalar",
            value: 'company.name'
          },
          {
            text: 'ACTIONS',
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
.admin-companies-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>