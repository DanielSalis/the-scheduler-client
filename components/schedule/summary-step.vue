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

      <p class="text-subtitle-2 mt-4">
        Leitos não selecionados
      </p>

      <div
        v-if="availiableBeds"
        class="mb-4"
      >
        <v-chip
          v-for="(item, index) in availableChips"
          :key="index"
          :color="item.classification.color"
        >
          {{ item.name }}
        </v-chip>
      </div>

      <v-form
        v-if="selectedUsers && selectedUsers.length > 0"
        ref="summary-form"
        class="summary-step__form-container "
      >
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="name"
          class="elevation-1"
        >
          <template #item.actions="{ item: combobox }">
            <v-combobox
              v-model="combobox.beds"
              :items="availableChips"
              item-text="name"
              item-value="id"
              return-object
              clearable
              label="Selecione os leitos"
              multiple
              solo
              dense
              @change="selectChip($event)"
            >
              <template #selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  :color="item.classification.color"
                  @click="select"
                  @click:close="remove(combobox, item)"
                >
                  <strong>{{ item.name }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </template>
        </v-data-table>
      </v-form>

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
        beds: null,
        users:[{user: 'daniel', workload: '6h'}, {user: 'daniel II', workload: '6h'}],
        chips: [],
        filteredChips: [],
        items: [],
        headers: [
          {
            text: "Funcionários alocados",
            value: 'user'
          },
          {
            text: "Carga horária",
            value: 'workload'
          },
          {
            text: 'ACTIONS',
            value: 'actions',
            sortable: false
          }
        ],
      }
    },
    computed: {
      ...mapState('stepper', [
        'selectedUsers',
        'availiableBeds',
      ]),

      availableChips(){
        const elementosNaoDuplicados = [];
        this.chips.forEach((objeto) => {
          if (!this.filteredChips.some((item) => item.id === objeto.id)) {
            elementosNaoDuplicados.push(objeto);
          }
        });
        return elementosNaoDuplicados
      }
    },
    watch:{
      availiableBeds:{
        handler(newValue){
          this.chips = JSON.parse(JSON.stringify(newValue));
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      goToPrevStep(){
        this.$emit('change', 'prev')
      },
      selectChip(event){
        this.filteredChips = [...event]
      },
      remove (combobox, item) {
        combobox.beds.splice(combobox.beds.indexOf(item), 1)
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