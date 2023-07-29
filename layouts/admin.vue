<template>
  <v-app class="admin-layout">
    <GNavigator />
    <main class="admin-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import GNavigator from '~/components/g-navigator.vue';
  export default {
    name: 'AdminLayout',
    components: {
      GNavigator
    },
    computed: {
      ...mapGetters("auth", ['getAuthData']),
    },
    beforeMount() {
      if(this.getAuthData && this.getAuthData.user_role?.name !== 'Admin'){
        return this.$router.push('/')
      }
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