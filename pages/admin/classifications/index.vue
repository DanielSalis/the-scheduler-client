<template>
  <gContainer class="admin-classifications-page-container">
    <v-card>
      <v-toolbar
        flat
        color="white"
      >
        <v-toolbar-title>Classificações</v-toolbar-title>
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
          <classificationsList
            v-if="classificationData && classificationData.length"
            :headers="headers"
            :classifications="classificationData"
          />
        </v-tab-item>
        <v-tab-item>
          <classificationsAdd
            v-if="classificationData && classificationData.length"
            :classifications="classificationData"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import classificationsList from '~/components/classifications/classifications-list.vue';
  import classificationsAdd from '~/components/classifications/classifications-add.vue';
  export default {
    name: "AdminUnitiesPage",
    components: {
      gContainer,
      classificationsList,
      classificationsAdd,
    },
    layout: 'admin',
    data () {
      return {
        search: '',
        classificationData: null,
      }
    },
    async fetch(){
      const classificationResponse = await this.$axios.get('/classification/getAll')
      this.classificationData = classificationResponse.data
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
            text: "Cor",
            value: 'color'
          },
          {
            text: "Tempo estimado (min)",
            value: 'estimated_time'
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
.admin-classifications-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>