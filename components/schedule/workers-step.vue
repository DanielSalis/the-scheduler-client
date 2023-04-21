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
        v-if="users"
        ref="workers-form"
        class="workers-step__form-container"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="users"
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

      <div class="workers-step__button-group mt-2">
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
  import { mapGetters } from 'vuex';
  export default {
    name: "WorkersStep",

    data() {
      return {
        search: '',
        users: [],
        shiftId: '',
        classifications: [],
        headers: [
          {
            text: "Id",
            value: 'id'
          },
          {
            text: "Nome",
            value: 'name'
          },
          {
            text: "Email",
            value: 'email'
          },
          {
            text: 'Turno',
            value: 'action',
            sortable: false
          }
        ],
        classificationRule: [
          v => !!v || 'Classificação é necessária',
        ],
      }
    },
    computed: {
    },

    async beforeMount() {
      await this.getUsers();
    },
    methods: {
      ...mapGetters("auth", ['getAuthData']),

      goToNextStep(){
        if(this.$refs['workers-form'].validate()){
          this.$emit('change', 'next')
        }
      },
      goToPrevStep(){
        this.$emit('change', 'prev')
      },
      async getUsers(){
        const unityId = this.getAuthData().unityId
        await this.$axios.get(`/user/getAllByUnityId/${unityId}`).then((response)=>{
          this.users = response.data
        }).catch(err=>{
          console.log(err);
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.workers-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 240px);
}

.workers-step__form-container{
  display: flex;
  flex-direction: row;
  gap: 16px;
  min-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
}
</style>