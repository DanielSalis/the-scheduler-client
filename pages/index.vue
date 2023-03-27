<template>
  <gContainer class="home-page__container">
    <div
      v-for="route,index in routeItems"
      :key="index"
    >
      <div class="text-h5 ml-3">
        {{ route.name }}
      </div>
      <v-row
        class="my-6 mx-0"
        style="width: 100%;"
      >
        <v-col
          v-for="tool, toolsIndex in route.tools"
          :key="toolsIndex"
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
                  {{ tool.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ tool.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                outlined
                text
                block
                @click="redirectToRoute(tool.route)"
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
            name: "Admin",
            tools: [
              {
                name: 'Usuários',
                description: 'Crie / Edite / Delete / Atualize usuários',
                route:"/admin/users"
              },
              {
                name: 'Redes Hospitalares',
                description: 'Crie / Edite / Delete / Atualize Redes',
                route:"/admin/companies"
              },
              {
                name: 'Hospitais',
                description: 'Crie / Edite / Delete / Atualize Hospitais',
                route:"/admin/hospitals"
              }
            ]
          },
        ]
      }
    },
    methods: {
      redirectToRoute(route){
        this.$router.push(route)
      }
    },
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