<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquise aqui por leitos"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="beds"
      sort-by="name"
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
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
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
          Carregando leitos
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
      <v-card v-if="!dialogLoading && bed && classifications">
        <v-card-title>
          <span class="text-h5">Editar leito</span>
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
                  v-model="bed.name"
                  label="Nome"
                  required
                  hint="Nome do leito"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  v-model="bed.classification_id"
                  :items="classifications"
                  item-text="name"
                  item-value="id"
                  label="Classificação"
                  solo
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="bed.id"
                  label="Identificador do leito"
                  disabled
                  hint=""
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
    name: "BedsList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      beds: {
        required: true,
        type: Array
      },
      classifications: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: '',
        dialog: false,
        dialogLoading: false,
        bed: {},
      }
    },
    methods: {
      async editItem (item) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/bed/getById/${item.id}`)

        if(response){
          setTimeout(()=>{
            this.bed = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("Erro ao carregar leitos");
        }
      },

      async deleteItem (item) {
        if(confirm("Certeza que deseja deletar?")){
          const response = await this.$axios.delete(`/bed/deleteById/${item.id}`)
          const {bed} = response.data
          if (bed.id) {
            alert("Leito deletado com sucesso")
            this.$router.go()
          }
        }
      },

      async saveInfo(){
        try{
          await this.$axios.put("/bed/updateById", this.bed)
          await alert("Atualizado com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>