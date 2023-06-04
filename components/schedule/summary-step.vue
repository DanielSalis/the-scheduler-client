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

      <p
        v-if="!availableChips"
        class="text-subtitle-2 mt-4"
      >
        Leitos não selecionados
      </p>

      <p
        v-else
        class="text-subtitle-2 mt-4"
      >
        Todos os leitos foram selecionados 🙂
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
          <template #item.workload="{item: row}">
            <div v-if="row.workload">
              {{ row.workload }} minutos
            </div>
            <div v-else>
              -
            </div>
          </template>

          <template #item.actions="{ item: row }">
            <v-container class="summary-step__actions-container">
              <v-combobox
                v-model="row.beds"
                :items="availableChips"
                item-text="name"
                item-value="id"
                return-object
                label="Selecione os leitos"
                multiple
                solo
                @change="selectChip($event, row)"
              >
                <template #selection="{ attrs, item: bed, select, selected }">
                  <v-chip
                    class="summary-step__actions-chip"
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    :color="bed.classification.color"
                    @click="select"
                    @click:close="remove(row, bed)"
                  >
                    <strong>{{ bed.name }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-container>
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
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "SummaryStep",
    data() {
      return {
        beds: null,
        users:[],
        chips: [],
        filteredChips: [],
        headers: [
          {
            text: "Funcionários alocados",
            value: 'name'
          },
          {
            text: 'Leitos',
            value: 'actions',
            sortable: false
          },
          {
            text: "Carga horária",
            value: 'workload'
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
        if(!this.chips) return []
        const duplicatedChips = [];
        this.chips.forEach((classification) => {
          if (!this.filteredChips.some((item) => item.id === classification.id)) {
            duplicatedChips.push(classification);
          }
        });
        return duplicatedChips
      }
    },
    watch:{
      availiableBeds:{
        handler(newValue){
          this.chips = JSON.parse(JSON.stringify(newValue));
        },
        deep: true,
        immediate: true
      },

      selectedUsers:{
        handler(newValue){
          this.users = JSON.parse(JSON.stringify(newValue));
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      ...mapActions("stepper", [
        'setSelectedUsers'
      ]),

      goToPrevStep(){
        this.$emit('change', 'prev')
      },
      goToNextStep(){
        if(confirm("Deseja finalizar o dimensionamento?")){
          this.setSelectedUsers(this.users)
          console.log("Terminou");
        }
      },
      selectChip(event, row){
        if(event.length <= 0) return

        row.workload = this.calculateWorkload(row.beds)

        const aux = [...event]
        this.filteredChips.push(aux[aux.length - 1])
      },
      remove (row, item) {
        row.workload = row.workload - item.classification.estimated_time;
        this.filteredChips.splice(this.filteredChips.indexOf(item), 1)
        row.beds.splice(row.beds.indexOf(item), 1)
      },
      calculateWorkload(bedsArray){
        let counter = 0;
        bedsArray.forEach(bed=>{
          counter = counter + bed.classification.estimated_time
        })
        return counter
      }
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

.summary-step__actions-container{
  width: 100%;
  max-width: 400px;
}

.summary-step__actions-chip{
  margin-bottom: 4px;
}
</style>