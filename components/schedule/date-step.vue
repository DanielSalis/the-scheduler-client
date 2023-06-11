<template>
  <v-stepper-content
    step="2"
  >
    <div class="date-step__container">
      <div class="date-step__titles">
        <div class="text-h4">
          Selecione a data
        </div>

        <div class="text-subtitle-1">
          Neste campo é preciso selecionar a data e o turno em deseja fazer o dimensionamento
        </div>
      </div>

      <v-form
        v-if="availableShifts"
        ref="date-form"
        class="date-step__modal-container"
      >
        <div class="date-step__date-container">
          <v-date-picker
            v-model="date"
            :show-current="false"
            :first-day-of-week="1"
            locale="pt-br"
          />

          <span
            v-if="!dateIsValid && $refs['date-form'].validate()"
            class="red--text"
          >Data não pode ser anterior ao dia atual</span>
        </div>

        <v-select
          v-model="shift"
          :items="availableShifts"
          :rules="shiftRule"
          item-text="name"
          return-object
          label="Turnos"
          solo
        />
      </v-form>

      <div class="date-step__button-group">
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
  import { mapActions, mapState } from 'vuex';
  const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)

  export default {
    name: "DateStep",

    data() {
      return {
        shift: '',
        date: today,
        shiftRule: [
          v => !!v || 'Turno é necessário',
        ],
      }
    },
    computed: {
      ...mapState("stepper", ['availableShifts']),

      dateIsValid(){
        return this.date >= today
      }
    },

    methods: {
      ...mapActions("stepper", [
        'setOperationalDay',
        'setShift',
        'fetchAllClassifications'
      ]),

      goToNextStep(){
        if(this.$refs['date-form'].validate() && this.dateIsValid){
          this.setOperationalDay(this.date)
          this.setShift(this.shift)
          this.fetchAllClassifications()
          this.$emit('change', 'next')
        }
      },
      goToPrevStep(){
        this.$emit('change', 'prev')
      },
    },
  }
</script>

<style lang="scss" scoped>
.date-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 280px);
}

.date-step__date-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.date-step__modal-container{
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 520px;
  margin-left: auto;
  margin-right: auto;
}
</style>