<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-stepper-content
    step="3"
  >
    <div class="bed-step__container">
      <div class="bed-step__titles">
        <div class="text-h4">
          Classificação dos leitos - {{ unity?.name }}
        </div>

        <div class="text-subtitle-1">
          Atribua a classificação desejada aos leitos disponíveis desta unidade
        </div>
      </div>

      <!-- <v-form
        v-if="localAvailiableBeds"
        ref="beds-form"
        class="bed-step__form-container"
      >
        <v-data-table
          :search="search"
          :headers="headers"
          :items="localAvailiableBeds"
          sort-by="name"
          class="elevation-1 bed-step__form-table"
          :items-per-page="16"
          :footer-props="{
            'items-per-page-options': [4, 8, 12, 16, 32, 64]
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
      </v-form> -->

      <div
        v-if="filteredBeds && filteredBeds.length > 0 "
        class="bed-step__beds"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Clique aqui e procure o leito desejado"
          single-line
          hide-details
        />
        <div class="bed-step__beds-container mt-8">
          <v-card
            v-for="(item, index) in filteredBeds"
            :key="index"
            class="bed-step__beds-item "
          >
            <v-card-title>
              <span>{{ item.name }}</span>
            </v-card-title>
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
          </v-card>
        </div>
      </div>

      <div class="bed-step__button-group mt-2">
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
  import { mapActions, mapState, mapGetters } from 'vuex';
  export default {
    name: "BedStep",

    data() {
      return {
        search: '',
        localAvailiableBeds: [],
        shiftId: '',
        headers: [
          {
            text: "Nome (clique para ordenar)",
            value: 'name'
          },
          {
            text: 'Classificação (clique para ordenar)',
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

      filteredBeds() {
          const sortedArray = this.sortByName(this.localAvailiableBeds)
          return sortedArray.filter(item=>item.name.includes(this.search))
      },
    },

    watch:{
      availiableBeds:{
        handler(newValue){
          this.localAvailiableBeds = JSON.parse(JSON.stringify(newValue));
        },
        deep: true,
        immediate: true
      }
    },

    methods: {
      ...mapActions("stepper", [
        'fetchUsers',
        'updateBedClassification',
      ]),
      ...mapGetters("stepper", [
        'getClassifications',
        'getUnity'
      ]),

      sortByName(arr) {
        return arr.sort((a, b) => {
          const nameA = a.name;
          const nameB = b.name;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      },

      goToNextStep(){
        this.fetchUsers(this.unity)
        this.$emit('change', 'next')
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

.bed-step__beds {
  display: flex;
  flex-direction: column;
}

.bed-step__beds-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.bed-step__beds-item {
  width: 220px;
}
</style>