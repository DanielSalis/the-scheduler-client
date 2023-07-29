<template>
  <div class="admin-layout__navigation">
    <v-app-bar
      color="primary"
      dark
    >
      <v-toolbar-title>Bem vindo, {{ userName }}</v-toolbar-title>

      <v-spacer />

      <v-app-bar-nav-icon @click="drawer = true" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item
            v-for="item,index in availableRoutes"
            :key="index"
            @click="$router.push(item.route)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'GlobalNavigator',
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          icon:'mdi-home',
          name:'Home',
          route:'/',
          availableFor:['Admin', 'Enfermeiro'],
        },
        {
          icon:'mdi-account',
          name:'Usuários',
          route:'/admin/users',
          availableFor: ['Admin'],
        },
        {
          icon:'mdi-domain',
          name:'Redes',
          route:'/admin/companies',
          availableFor: ['Admin'],

        },
        {
          icon:'mdi-hospital-building',
          name:'Hospitais',
          route:'/admin/hospitals',
          availableFor: ['Admin'],
        },
        {
          icon:'mdi-hospital-box',
          name:'Unidades',
          route:'/admin/unities',
          availableFor: ['Admin'],
        },
        {
          icon:'mdi-bed',
          name:'Leitos',
          route:'/admin/beds',
          availableFor: ['Admin'],
        },
        {
          icon:'mdi-exit-to-app',
          name:'Sair',
          route:'/login',
          availableFor: ['Admin', 'Enfermeiro'],
        }
      ]
    }),
    computed:{
      ...mapGetters("auth", ['getAuthData']),

      userName(){
        return this.getAuthData.name
      },

      availableRoutes() {
        const routes = this.items.filter((route)=>{
          if(route.availableFor.includes(this.getAuthData.user_role.name)){
            return route
          }
        })

        return routes
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>