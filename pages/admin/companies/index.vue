<template>
  <gContainer class="admin-companies-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Redes Hospitalares</v-toolbar-title>
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
          <companiesList
            v-if="companiesData && companiesData.length"
            :headers="headers"
            :companies="companiesData"
          />
        </v-tab-item>
        <v-tab-item>
          <companiesAdd />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import companiesList from '~/components/companies/companies-list.vue';
  import companiesAdd from '~/components/companies/companies-add.vue';
  export default {
    name: "AdminCompaniesPage",
    components: {
      gContainer,
      companiesList,
      companiesAdd,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        companiesData: null
      }
    },
    async fetch(){
      const response = await this.$axios.get('/company/getAll')
      this.companiesData = response.data
    },
    computed: {
      headers(){
        console.log(this.companiesData);
        const headersData = [
          {
            text: "Id",
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