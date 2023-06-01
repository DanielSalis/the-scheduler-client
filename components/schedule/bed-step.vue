<!-- eslint-disable vue/valid-v-slot -->
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
        v-if="availiableBedsII"
        ref="beds-form"
        class="bed-step__form-container"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="availiableBedsII"
          sort-by="name"
          class="elevation-1"
          :items-per-page="5"
          :footer-props="{
            'items-per-page-options': [5, 10, 15]
          }"
        >
          <template #item.action="{ item, index }">
            <v-select
              v-model="item.classification"
              :value="item.classification"
              class="mt-4 mb-4"
              :style="{backgroundColor:item.classification.color}"
              :items="classifications"
              :rules="classificationRule"
              item-text="name"
              return-object
              label="Classificação"
              solo
              @change="updateBedClassification({
                event: $event,
                index,
                item,
                unity
              })"
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
  import { mapActions, mapState, mapGetters } from 'vuex';
  export default {
    name: "BedStep",

    data() {
      return {
        search: '',
        availiableBedsII: [],
        shiftId: '',
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
            text: 'Classificação',
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
      ...mapState("stepper", [
        'availiableBeds',
        'classifications',
        'unity'
      ]),
    },

    watch:{
      availiableBeds:{
        handler(newValue, oldValue){
          console.log({newValue, oldValue});
          this.availiableBedsII = JSON.parse(JSON.stringify(newValue));
        },
        deep: true,
        immediate: true
      }
    },

    methods: {
      ...mapActions("stepper", [
        'setDate',
        'fetchUsers',
        'updateBedClassification',
      ]),
      ...mapGetters("stepper", [
        'getClassifications',
        'getUnity'
      ]),

      goToNextStep(){
        if(this.$refs['beds-form'].validate()){
          this.fetchUsers(this.unity)
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
.bed-step__container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // height: calc(100vh - 240px);
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