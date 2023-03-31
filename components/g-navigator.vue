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
            v-for="item,index in items"
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
        },
        {
          icon:'mdi-account',
          name:'Usuários',
          route:'/admin/users',
        },
        {
          icon:'mdi-domain',
          name:'Redes',
          route:'/admin/companies',
        },
        {
          icon:'mdi-hospital-building',
          name:'Hospitais',
          route:'/admin/hospitals',
        },
        {
          icon:'mdi-hospital-box',
          name:'Unidades',
          route:'/admin/unities',
        },
        {
          icon:'mdi-bed',
          name:'Leitos',
          route:'/admin/beds',
        },
        {
          icon:'mdi-exit-to-app',
          name:'Sair',
          route:'/login',
        }
      ]
    }),
    computed:{
      ...mapGetters("auth", ['getAuthData']),
      userName(){
        return this.getAuthData.name
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>