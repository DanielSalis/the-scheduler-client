<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-stepper-content
    step="4"
  >
    <div class="workers-step__container">
      <div class="workers-step__titles">
        <div class="text-h4">
          Seleção dos funcionários
        </div>

        <div class="text-subtitle-1">
          Selecione os funcionários que estarão disponíveis para a data e turno previamente selecionados
        </div>
      </div>

      <v-form
        v-if="availableUsers"
        ref="workers-form"
        class="workers-step__form-container"
      >
        <v-card class="workers-step__form-card">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            v-model="selectedUsers"
            :search="search"
            :headers="headers"
            :items="availableUsers"
            sort-by="code"
            class="elevation-1"
            show-select
          />
        </v-card>
      </v-form>

      <div class="workers-step__button-group mt-2">
        <v-btn
          text
          @click="goToPrevStep()"
        >
          Voltar
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
  import { mapGetters, mapState, mapActions } from 'vuex';
  export default {
    name: "WorkersStep",

    data() {
      return {
        search: '',
        selectedUsers: [],
        headers: [
          {
            text: "Matrícula (clique para ordenar)",
            value: 'code'
          },
          {
            text: "Nome (clique para ordenar)",
            value: 'name'
          },
          {
            text: "Cargo (clique para ordenar)",
            value: 'user_role.name'
          },
        ],
        classificationRule: [
          v => !!v || 'Classificação é necessária',
        ],
      }
    },

    updated() {
      console.log(this.availableUsers)
    },

    computed: {
      ...mapState('stepper', [
        'availableUsers'
      ])
    },

    methods: {
      ...mapGetters("auth", ['getAuthData']),
      ...mapActions("stepper", [
        'setSelectedUsers',
        'setAvailableUsers',
        'fetchUsers'
      ]),

      goToNextStep(){
        if(this.$refs['workers-form'].validate()){
          this.setSelectedUsers(this.selectedUsers)
          this.$emit('change', 'next')
        }
      },
      goToPrevStep(){
        this.setAvailableUsers([])
        this.setSelectedUsers([])
        this.$emit('change', 'prev')
      },
    },
  }
</script>

<style lang="scss" scoped>
.workers-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 240px);
}

.workers-step__form-container{
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  height: 100%;
}

.workers-step__form-card {
  width: 100%;
  height: 100%;
}

</style>