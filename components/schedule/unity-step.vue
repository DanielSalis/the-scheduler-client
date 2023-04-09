<template>
  <v-stepper-content step="1">
    <v-card
      class="mb-12"
      color="blue lighten-1"
      height="200px"
    />

    <v-btn
      color="primary"
      @click="goToNextStep()"
    >
      Continue
    </v-btn>

    <v-btn
      text
      @click="goToPrevStep()"
    >
      Cancel
    </v-btn>
  </v-stepper-content>
</template>

<script>
  export default {
    name: "UnityStep",
    methods: {
      goToNextStep(){
        this.$emit('change', 'next')
      },
      goToPrevStep(){
        this.$emit('change', 'prev')
      }
    },
  }
</script>