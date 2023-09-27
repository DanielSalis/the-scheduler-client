<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquise aqui por classificações"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="classifications"
      sort-by="estimated_time"
      class="elevation-1"
    >
      <template #item.color="{ item }">
        <v-chip :color="item.color">
          {{ item.color }}
        </v-chip>
      </template>
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
          Carregando classificações
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
      <v-card v-if="!dialogLoading && classification">
        <v-card-title>
          <span class="text-h5">Editar classificação</span>
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
                  v-model="classification.name"
                  label="Nome"
                  required
                  hint="Nome da classificação"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="classification.color"
                  label="Cor"
                  hint="Use o padrão hexadecimal: #aaa111"
                >
                  <template #append>
                    <div :style="{backgroundColor: classification.color, width: '80px', height: '20px'}" />
                  </template>
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="classification.estimated_time"
                  label="Tempo estimado"
                  hint="Tempo em minutos"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="classification.id"
                  label="Id"
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
    name: "ClassificationsList",
    props: {
      headers: {
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
        classification: null,
      }
    },
    methods: {
      async editItem (classification) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/classification/getById/${classification.id}`)

        if(response){
          setTimeout(()=>{
            this.classification = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("erro ao carregar rede");
        }
      },

      async deleteItem (item) {
        if(confirm("Certeza que deseja deletar?")){
          const response = await this.$axios.delete(`/classification/deleteById/${item.id}`)
          const {classification} = response.data
          if (classification.id) {
            alert("Rede deletada com sucesso")
            this.$router.go()
          }
        }
      },

      async saveInfo(){
        try{
          await this.$axios.put("/classification/updateById", this.classification)
          await alert("Rede atualizada com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>