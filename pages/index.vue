<template>
  <gContainer class="home-page__container">
    <div>
      <div class="text-h5 ml-3">
        Gerenciamento
      </div>
      <v-row
        class="my-6 mx-0"
        style="width: 100%;"
      >
        <v-col
          v-for="route, index in routeItems"
          :key="index"
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
                  {{ route.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ route.description }}</v-list-item-subtitle>
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
      </v-row>
    </div>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  export default{
    name: "HomePage",
    components: {
      gContainer
    },
    data() {
      return {
        routeItems: [
          {
            name: 'Usuários',
            description: 'Crie / Edite / Delete / Atualize usuários',
            route:"/admin/users"
          },
          {
            name: 'Unidades',
            description: 'Crie / Edite / Delete / Atualize Unidades',
            route:"/admin/unities"
          }
        ]
      }
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