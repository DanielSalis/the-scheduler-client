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

      <span v-if="selectedUsers.length < 1">
        Selecione pelo menos um usuário
      </span>

      <div
        v-if="availiableBeds && selectedUsers && selectedUsers.length > 0"
        class="summary-available-beds mb-4"
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
                hint="Possível digitar para buscar leitos"
                persistent-hint
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
                <template #item="{ item: bed }">
                  <v-chip
                    :color="bed.classification.color"
                    label
                    small
                  >
                    {{ `${bed.name} - classificação: ${bed.classification.name}` }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-container>
          </template>

          <template #item.extraActions>
            <v-textarea
              style="margin-top: 4px;"
              rows="2"
              label="Escreva aqui as atividades extras, caso necessário"
              auto-grow
              solo
            />
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
            small
            class="px-4 py-4"
          >
            {{ item.name }}
          </v-chip>
          <v-col
            style="margin-left: auto;"
            cols="12"
            sm="3"
          >
            <v-textarea
              label="Assinatura"
              auto-grow
              outlined
              rows="1"
              row-height="15"
              disabled
            />
          </v-col>
        </div>
      </v-form>

      <div class="summary-step__button-group mt-2">
        <div>
          <v-btn
            text
            @click="goToPrevStep()"
          >
            Voltar
          </v-btn>
          <v-btn
            v-if="selectedUsers && selectedUsers.length > 0"
            color="primary"
            @click="goToNextStep()"
          >
            Continuar
          </v-btn>
        </div>

        <v-btn
          v-if="selectedUsers && selectedUsers.length > 0"
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
            text: "Carga de trabalho",
            value: 'workload'
          },
          {
            text: "Atividades extras",
            value: 'extraActions'
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
        if(!this.chips || this.chips.length <= 0) return []
        const duplicatedChips = [];
        this.chips.forEach((classification) => {
          if (!this.filteredChips.some((item) => item.id === classification.id)) {
            duplicatedChips.push(classification);
          }
        });
        console.log(duplicatedChips);
        return this.sortByClassificationName(duplicatedChips)
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

      sortByClassificationName(arr) {
        return arr.sort((a, b) => {
          const nameA = a.classification.estimated_time;
          const nameB = b.classification.estimated_time;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      },

      goToPrevStep(){
        this.filteredChips = []
        this.users = []
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
        const wrongUsers = this.runUserVerifications()
        if(wrongUsers.length > 0){
          if(!confirm(`Os funcionários com tempos incorretos:\n${wrongUsers.join('\n')}\n\nDeseja continuar?`)){
            return;
          }
        }
        if(confirm("Deseja finalizar o dimensionamento?")){
            this.dialogLoading=true;
            await this.setSelectedUsers(this.users);
            const hasFinished = await this.finishSchedule()
            if(hasFinished){
              this.dialogLoading=false;
              alert("Dimensionamento criado com sucesso!");
              await this.exportToPdf()
              this.$router.push("/")
            }else{
              this.dialogLoading=false;
              alert("Ocorreu um erro")
            }
          }
      },
      async exportToPdf(){
        const html = this.$refs["summary-form"].$el.innerHTML
        debugger;
        const element = html;
        const opt = {
          margin:       0.2,
          filename:     'dimensionamento.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 1 },
          jsPDF:        { unit: 'in', format: 'a2', orientation: 'landscape' }
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

.summary-available-beds {
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;

  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: flex-start;
  }
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