<template>
  <v-app
    v-if="shouldRender"
    class="admin-layout"
  >
    <GNavigator />
    <main class="admin-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import GNavigator from '~/components/g-navigator.vue';
  export default {
    name: 'AdminLayout',
    components: {
      GNavigator
    },
    data() {
      return {
        shouldRender: false
      }
    },
    computed: {
      ...mapGetters("auth", ['getAuthData']),
    },
    async beforeMount() {
      const auth = this.$cookies.get('auth')
      if(!auth){
        this.$router.push('/login')
      }
      await this.setAuthData(auth)

      if(this.getAuthData && this.getAuthData.user_role?.name !== 'Admin'){
        return this.$router.push('/')
      }

      this.shouldRender = true;
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