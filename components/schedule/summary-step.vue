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
        v-if="availableChips.length === 0"
        class="text-subtitle-2 mt-4"
      >
        Todos os leitos foram selecionados 🙂
      </p>


      <p
        v-else
        class="text-subtitle-2 mt-4"
      >
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
          ref="myTable"
          :headers="headers"
          :items="users"
          sort-by="name"
          class="elevation-1 summary-step__form-table"
        >
          <template #item.workload="{item: row}">
            <div style="display: flex; text-wrap: nowrap">
              <div v-if="row.workload">
                {{ row.workload }} minutos
              </div>
              <v-icon
                v-if="row.workload >= 400"
                color="#ff5252"
              >
                mdi-alert
              </v-icon>
              <v-icon
                v-if="row.workload <= 300"
                color="#82b1ff"
              >
                mdi-alert
              </v-icon>
              <div v-else-if="!row.workload">
                -
              </div>
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

        <div class="summary-step__form-caption">
          <div>
            <v-icon color="#ff5252">
              mdi-alert
            </v-icon>
            <span>Muitas horas trabalhadas</span>
          </div>
          <div>
            <v-icon color="#82b1ff">
              mdi-alert
            </v-icon>
            <span>Poucas horas trabalhadas</span>
          </div>
          <v-chip
            v-for="(item,index) in classifications"
            :key="index"
            :color="item.color"
          >
            {{ item.name }}
          </v-chip>
        </div>
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
          @click="exportToPdf()"
        >
          Exportar
        </v-btn>
      </div>
    </div>
    <v-dialog
      v-model="dialogLoading"
      persistent
      width="1024"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Carregando dimensionamento
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-stepper-content>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import html2pdf from 'html2pdf.js';

  export default {
    name: "SummaryStep",
    data() {
      return {
        dialogLoading: false,
        beds: null,
        teste: null,
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
        'classifications'
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
        'setSelectedUsers',
        'finishSchedule',
      ]),

      goToPrevStep(){
        this.$emit('change', 'prev')
      },

      runUserVerifications() {
        const inconsistentHoursUsers = []

        this.users.forEach((user)=> {
          if(user.workload >= 400 || user.workload <= 300) {
            inconsistentHoursUsers.push(user.name)
          }
        })

        return inconsistentHoursUsers
      },

      async goToNextStep(){
        const wrongUsers = this.runUserVerifications().join('\n')
        if(confirm(`Os funcionários com tempos incorretos:\n${wrongUsers}\n\nDeseja continuar?`)){
          if(confirm("Deseja finalizar o dimensionamento?")){
            this.dialogLoading=true;
            await this.setSelectedUsers(this.users);
            const hasFinished = await this.finishSchedule()
            if(hasFinished){
              this.dialogLoading=false;
              console.log("Terminou");
            }else{
              this.dialogLoading=false;
              alert("Ocorreu um erro")
            }
          }
        }
      },
      async exportToPdf(){
        const html = this.$refs["summary-form"].$el.innerHTML
        const element = html;
        const opt = {
          margin:       0.5,
          filename:     'dimensionamento.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 1 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        html2pdf().from(element).set(opt).save();
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

.summary-step__form-container {
  max-width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
}

.summary-step__form-table {
  margin: 0 16px;
}

.summary-step__form-caption {
  margin-top: 12px;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.summary-step__button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.summary-step__actions-container{
  margin: 0;
}

.summary-step__actions-chip{
  margin-bottom: 4px;
}
</style>