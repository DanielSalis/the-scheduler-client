<template>
  <v-app class="default-layout">
    <main class="default-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'DefaultLayout',
    beforeMount() {
      const auth = this.getAuthData()
      if(Object.keys(auth).length === 0){
        this.$router.push('/login')
      }
    },
    methods: {
      ...mapGetters('auth', ['getAuthData'])
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
