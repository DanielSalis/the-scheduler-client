<template>
  <v-app class="default-layout">
    <main class="default-layout__content">
      <Nuxt />
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout'
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
