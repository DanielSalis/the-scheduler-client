<template>
  <v-stepper-content step="2">
    <v-card
      class="mb-12"
      color="black lighten-1"
      height="200px"
    />

    <v-btn
      color="primary"
      @click="goToNextStep()"
    >
      Continue
    </v-btn>

    <v-btn text>
      Cancel
    </v-btn>
  </v-stepper-content>
</template>

<script>
  export default {
    name: "Step02Component",
    methods: {
      goToNextStep(){
        this.$emit('change')
      }
    },
  }
</script>