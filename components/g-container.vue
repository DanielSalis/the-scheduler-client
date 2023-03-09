<template>
  <div class="g-container">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'GContainer',
  };
</script>

<style lang="scss">
.g-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
}
</style>
