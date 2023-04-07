<template>
  <v-stepper-content step="3">
    <v-card
      class="mb-12"
      color="green lighten-1"
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
    name: "Step03Component",
    methods: {
      goToNextStep(){
        this.$emit('change')
      }
    },
  }
</script>