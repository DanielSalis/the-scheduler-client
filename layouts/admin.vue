<template>
  <v-app class="admin-layout">
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
            active-class="deep-purple--text text--accent-4"
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
    <main class="admin-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: 'AdminLayout',
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
    beforeMount() {
      const auth = this.$cookies.get('auth')
      if(!auth){
        this.$router.push('/login')
      }
      this.setAuthData(auth)
    },
    methods: {
      ...mapActions("auth",['setAuthData']),
    },
  }
</script>

<style lang="scss">
  .admin-layout{
    background-color: #F6F7F8;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .default-layout__content{
    flex: 1;
  }
</style>