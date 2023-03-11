<template>
  <v-app class="admin-layout">
    <GNavigator />
    <main class="admin-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';
  import GNavigator from '~/components/g-navigator.vue';
  export default {
    name: 'AdminLayout',
    components: {
      GNavigator
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