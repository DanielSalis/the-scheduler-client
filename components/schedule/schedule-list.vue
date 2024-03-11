<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquise por qualquer informação da tabela"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="schedules"
      sort-by="operational_day"
      sort-desc="desc"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
      <template #no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <v-card
        v-if="dialogLoading"
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
      <v-card v-if="!dialogLoading && schedule">
        <v-card-title>
          <span class="text-h5">Editar dimensionamento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="schedule.user.name"
                  disabled
                  label="Criado por:"
                  required
                  hint="Criado por:"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="schedule.shift.name"
                  disabled
                  label="Turno"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="schedule.unity.name"
                  disabled
                  label="Unidade"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  v-model="schedule.cancelled"
                  :items="[{name: 'Ativo', id: false}, {name: 'Cancelado', id: true}]"
                  item-text="name"
                  item-value="id"
                  label="Status"
                />
              </v-col>
            </v-row>
          </v-container>
          <small>*campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            variant="text"
            @click="dialog = false"
          >
            Fechar
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="saveInfo()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
  export default {
    name: "SchedulesList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      schedules: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: '',
        dialog: false,
        dialogLoading: false,
        schedule: null,
      }
    },
    methods: {
      async editItem (item) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/schedule/getById/${item.id}`)
        if(response){
          setTimeout(()=>{
            this.schedule = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("Erro ao carregar dimensionamentos");
        }
      },

      async saveInfo(){
        try{
          await this.$axios.put("/schedule/updateById", this.schedule)
          await alert("Dimensionamento atualizado com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>