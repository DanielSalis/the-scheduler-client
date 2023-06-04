<template>
  <gContainer class="admin-companies-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Unidades</v-toolbar-title>
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
          <unitiesList
            v-if="unityData && unityData.length"
            :headers="headers"
            :unities="unityData"
          />
        </v-tab-item>
        <v-tab-item>
          <unitiesAdd />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import unitiesList from '~/components/unities/unities-list.vue';
  import unitiesAdd from '~/components/unities/unities-add.vue';
  export default {
    name: "AdminUnitiesPage",
    components: {
      gContainer,
      unitiesList,
      unitiesAdd,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        unityData: null
      }
    },
    async fetch(){
      const response = await this.$axios.get('/unity/getAll')
      this.unityData = response.data
    },
    computed: {
      headers(){
        console.log(this.unityData);
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
            text: "Localização",
            value: 'location'
          },
          {
            text: "Hospital",
            value: 'hospital.name'
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