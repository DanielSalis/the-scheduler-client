<template>
  <v-app>
    <div class="login-layout">
      <Nuxt />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style lang="scss" scoped>
.login-layout {
  background-color: #1976D2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}
</style>
