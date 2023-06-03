<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-stepper-content
    step="5"
  >
    <div
      class="summary-step__container"
    >
      <div class="summary-step__titles">
        <div class="text-h4">
          Revisão
        </div>

        <div class="text-subtitle-1">
          Seu dimensionamento está pronto! Agora é só revisar e finalizar
        </div>
      </div>

      <v-form
        v-if="selectedUsers && selectedUsers.length > 0"
        ref="summary-form"
        class="summary-step__form-container"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="[{user: 'daniel', beds: 'teste', workload: '6h'}]"
          sort-by="name"
          class="elevation-1"
        />
      </v-form>

      <div
        v-for="item in users"
        :key="item.id"
      >
        <pre>{{ item }}</pre>
      </div>

      <div class="summary-step__button-group mt-2">
        <div>
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

        <v-btn
          color="primary"
          @click="goToNextStep()"
        >
          Exportar
        </v-btn>
      </div>
    </div>
  </v-stepper-content>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: "SummaryStep",
    data() {
      return {
        render: false,
        headers: [
          {
            text: "Funcionários alocados",
            value: 'user'
          },
          {
            text: "Distribuição de leitos",
            value: 'beds'
          },
          {
            text: "Carga horária",
            value: 'workload'
          },
        ],
      }
    },
    computed: {
      ...mapState('stepper', [
        'selectedUsers'
      ]),
    },
    methods: {
      goToPrevStep(){
        this.$emit('change', 'prev')
      },
    }
  }
</script>

<style lang="scss" scoped>
.summary-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.summary-step__button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>