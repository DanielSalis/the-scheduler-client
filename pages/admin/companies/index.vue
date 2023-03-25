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
          <p>Listar</p>
        </v-tab-item>
        <v-tab-item>
          <p>Aba de adicionar</p>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  export default {
    name: "AdminCompaniesPage",
    components: {
      gContainer
    }
  }
</script>

<style lang="scss" scoped>
.admin-companies-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>