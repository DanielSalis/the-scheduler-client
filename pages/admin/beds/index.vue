<template>
  <gContainer class="admin-beds-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Leitos</v-toolbar-title>
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
          <bedsList
            v-if="bedData && bedData.length && classificationData"
            :headers="headers"
            :beds="bedData"
            :classifications="classificationData"
          />
        </v-tab-item>
        <v-tab-item>
          <bedsAdd
            v-if=" unitiesData && unitiesData.length && classificationData && classificationData.length"
            :unities="unitiesData"
            :classifications="classificationData"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import bedsList from '~/components/beds/beds-list.vue';
  import bedsAdd from '~/components/beds/beds-add.vue';
  export default {
    name: "AdminUnitiesPage",
    components: {
      gContainer,
      bedsList,
      bedsAdd,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        bedData: null,
        classificationData: null,
        unitiesData: null
      }
    },
    async fetch(){
      const bedResponse = await this.$axios.get('/bed/getAll')
      this.bedData = bedResponse.data

      const classificationResponse = await this.$axios.get('/classification/getAll')
      this.classificationData = classificationResponse.data

      const unitiesResponse = await this.$axios.get('/unity/getAll')
      this.unitiesData = unitiesResponse.data
    },
    computed: {
      headers(){
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
            text: "Unidade",
            value: 'unity.name'
          },
          {
            text: "Classificação",
            value: 'classification.name'
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
.admin-beds-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>