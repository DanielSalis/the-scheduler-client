<template>
  <v-stepper-content
    step="5"
  >
    <div class="summary-step__container">
      <div class="summary-step__titles">
        <div class="text-h4">
          Revisão
        </div>

        <div class="text-subtitle-1">
          Seu dimensionamento está pronto! Agora é só revisar e finalizar
        </div>
      </div>

      <v-form
        ref="summary-form"
        class="summary-step__form-container"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="[{user: 'daniel', beds: 'teste', workload: '6h'}]"
          sort-by="name"
          class="elevation-1"
        >
          <template #item.action="{ item }">
            <v-checkbox
              v-model="item.enabled"
              :label="`Checkbox`"
            />
          </template>
        </v-data-table>
      </v-form>

      <div class="summary-step__button-group mt-2">
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
    </div>
  </v-stepper-content>
</template>

<script>
  export default {
    name: "WorkersStep",

    data() {
      return {
        headers: [
          {
            text: "Usuários",
            value: 'id'
          },
          {
            text: "Leitos",
            value: 'name'
          },
          {
            text: "Carga horária",
            value: 'email'
          },
          {
            text: 'Turno',
            value: 'action',
            sortable: false
          }
        ],
      }
    },

    async beforeMount() {
      console.log("mounted");
    },
  }
</script>

<style lang="scss" scoped>
.summary-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 240px);
}

.summary-step__form-container{
  display: flex;
  flex-direction: row;
  gap: 16px;
  min-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
}
</style>