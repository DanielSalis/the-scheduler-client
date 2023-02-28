<template>
  <gContainer class="admin-user-page-container">
    <h1>Usuários</h1>
  </gContainer>
</template>

<script>
  import gContainer from '~/components/g-container.vue';
  export default {
    name: 'AdminUserPage',
    components: {
      gContainer
    },
    layout: 'admin'
  }
</script>

<style lang="scss">
.admin-user-page-container{
  width: 100%;
  margin-top: 76px;
}
</style>