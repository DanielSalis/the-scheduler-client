<template>
  <v-stepper-content step="1">
    <div class="text-h4">
      Selecione a unidade desejada
    </div>

    <div class="text-subtitle-1">
      Escolha apenas uma unidade que deseje fazer o dimensionamento
    </div>


    <div class="mt-10">
      <v-btn
        text
        @click="goToPrevStep()"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="primary"
        @click="goToNextStep()"
      >
        Continuar
      </v-btn>
    </div>
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