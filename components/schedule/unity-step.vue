<template>
  <v-stepper-content
    step="1"
  >
    <div class="unity-step__container">
      <div class="unity-step__titles">
        <div class="text-h4">
          Selecione a unidade desejada
        </div>

        <div class="text-subtitle-1">
          Escolha apenas uma unidade que deseje fazer o dimensionamento
        </div>
      </div>

      <v-form
        v-if="unities"
        ref="unity-form"
        class="unity-step__modal-container"
      >
        <v-select
          v-model="unity"
          :items="unities"
          :rules="unitiesRule"
          item-text="name"
          return-object
          label="Unidades"
          solo
        />
      </v-form>

      <div class="unity-step__button-group">
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "UnityStep",

    data() {
      return {
        unities: [],
        unity: '',
        unitiesRule: [
          v => !!v || 'Unidade é necessária',
        ],
      }
    },

    async beforeMount() {
      await this.getUnities();
    },
    methods: {
      ...mapGetters("auth", ['getAuthData']),
      ...mapActions("stepper", ['setUnity']),
      ...mapActions("stepper", ['fetchBeds']),
      ...mapActions("stepper", ['fetchShifts']),
      ...mapActions("stepper", ['setUserCreator']),

      goToNextStep(){
        if(this.$refs['unity-form'].validate()){
          this.setUnity(this.unity)
          this.fetchBeds(this.unity)
          this.fetchShifts()
          this.setUserCreator(this.getAuthData())
          this.$emit('change', 'next')
        }
      },
      goToPrevStep(){
        this.$emit('change', 'prev')
      },
      async getUnities(){
        const {unityId} = this.getAuthData()
        await this.$axios.get(`/unity/getAllUnitiesBySibling/${unityId}`).then((response)=>{
          this.unities = response.data.Unity
        }).catch(err=>{
          console.log(err);
        })

      }
    },
  }
</script>

<style lang="scss" scoped>
.unity-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 280px);
}

.unity-step__modal-container{
  width: 520px;
  margin-left: auto;
  margin-right: auto;
}
</style>