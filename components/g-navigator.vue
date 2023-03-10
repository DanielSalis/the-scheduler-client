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
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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