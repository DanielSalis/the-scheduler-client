<template>
  <gContainer class="home-page__container">
    <v-expansion-panels>
      <v-expansion-panel
        v-for="route,index in availableRoutes"
        :key="index"
        style="width: 100%;"
      >
        <v-expansion-panel-header
          class="text-h5 ml-3"
        >
          {{ route.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  import {mapGetters} from 'vuex'
  export default{
    name: "HomePage",
    components: {
      gContainer
    },
    data() {
      return {
        routeItems: [
          {
            availableFor: ['Admin'],
            name: "Admin",
            tools: [
              {
                name: 'Usuários',
                description: 'Atualize Usuários',
                route:"/admin/users"
              },
              {
                name: 'Redes Hospitalares',
                description: 'Atualize Redes',
                route:"/admin/companies"
              },
              {
                name: 'Hospitais',
                description: 'Atualize Hospitais',
                route:"/admin/hospitals"
              },
              {
                name: 'Unidades',
                description: 'Atualize Unidades',
                route:"/admin/unities"
              },
              {
                name: 'Leitos',
                description: 'Atualize Leitos',
                route:"/admin/beds"
              },
              {
                name: 'Calssificações',
                description: 'Atualize as propriedades de cada classificação',
                route:"/admin/classifications"
              },
              {
                name: 'Dimensionamentos',
                description: 'Atualize dimensionamentos',
                route:"/admin/schedules"
              },
            ]
          },
          {
            availableFor: ['Admin', 'Enfermeiro'],
            name: "Ferramentas",
            tools: [
              {
                name: 'Dimensionamento',
                description: 'Distribua as responsabilidades de seu time e crie um dimensionamento',
                route:"/schedule"
              }
            ]
          },
          {
            availableFor: ['Admin', 'Enfermeiro'],
            name: "Dashboards",
            tools: [
              {
                name: 'Horas trabalhadas',
                description: 'Horas trabalhadas por unidades e turnos',
                route:"/dashboard/mean-workload"
              },
              {
                name: 'Relatório de funcionários',
                description: 'Horas trabalhadas de cada usuário por data',
                route:"/dashboard/mean-workload-by-user"
              }
            ]
          },
        ]
      }
    },
    computed: {
      ...mapGetters("auth", ['getAuthData']),
      availableRoutes(){
        const routes = [];

        this.routeItems.forEach(routeItem => {
          if(routeItem.availableFor.includes(this.getAuthData.user_role.name)){
            routes.push(routeItem)
          }
        });

        return routes
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