<template>
  <v-app class="default-layout">
    <main class="default-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'DefaultLayout',
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

<style lang="scss" scoped>
.default-layout {
  background-color: #F6F7F8;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.default-layout__content{
  flex: 1;
}
</style>
