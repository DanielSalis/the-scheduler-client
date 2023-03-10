<template>
  <gContainer class="home-page__container">
    <div class="text-h5 ml-3">
      Gerenciamento
    </div>
    <v-row
      class="my-6 mx-0"
      style="width: 100%;"
    >
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-card
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1">
                Usuários
              </v-list-item-title>
              <v-list-item-subtitle>Crie / Edite / Delete / Atualize usuários</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              text
              block
            >
              Acessar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-card class="home-page__card">
          teste 2
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <v-card class="home-page__card">
          teste 2
        </v-card>
      </v-col>
    </v-row>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  export default{
    name: "HomePage",
    components: {
      gContainer
    }
  }
</script>

<style lang="scss">
.home-page__container{
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 24px auto;
}
</style>