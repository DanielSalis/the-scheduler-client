<template>
  <v-stepper-content
    step="3"
  >
    <div class="bed-step__container">
      <div class="bed-step__titles">
        <div class="text-h4">
          Classificação dos leitos
        </div>

        <div class="text-subtitle-1">
          Atribua a classficição adequada para os leitos disponíveis na unidade selecionada
        </div>
      </div>

      <v-form
        v-if="beds"
        ref="date-form"
        class="bed-step__form-container"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="beds"
          sort-by="name"
          class="elevation-1"
        >
          <template #item.action="{ item }">
            <v-select
              v-model="item.classification"
              class="mt-4 mb-4"
              :style="{backgroundColor:item.classification.color}"
              :items="classifications"
              :rules="classificationRule"
              item-text="name"
              item-value="id"
              return-object
              label="Classificação"
              solo
              @change="teste($event, item)"
            />
          </template>
        </v-data-table>
      </v-form>

      <div class="bed-step__button-group mt-2">
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
    name: "UnityStep",

    data() {
      return {
        beds: [],
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
      await this.getBeds();
      await this.getAllClassifications();
    },
    methods: {
      ...mapGetters("auth", ['getAuthData']),

      goToNextStep(){
        if(this.$refs['date-form'].validate() && this.dateIsValid){
          this.$emit('change', 'next')
        }
      },
      goToPrevStep(){
        this.$emit('change', 'prev')
      },
      async getBeds(){
        const unityId = this.getAuthData().unityId
        console.log(unityId);
        await this.$axios.get(`/bed/getAllByUnityId/${unityId}`).then((response)=>{
          console.log(response.data);
          this.beds = response.data
        }).catch(err=>{
          console.log(err);
        })
      },
      async getAllClassifications(){
        await this.$axios.get(`/classification/getAll`).then((response)=>{
          console.log(response.data);
          this.classifications = response.data
        }).catch(err=>{
          console.log(err);
        })
      },
      teste(event, item){
        console.log({event, item})
      }
    },
  }
</script>

<style lang="scss" scoped>
.bed-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 240px);
}

.bed-step__form-container{
  display: flex;
  flex-direction: row;
  gap: 16px;
  min-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
}
</style>