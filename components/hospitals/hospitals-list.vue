<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquise pela informação que desejar (nome, endereço, etc)"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="hospitals"
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
          Carregando usuário
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
      <v-card v-if="!dialogLoading && hospital">
        <v-card-title>
          <span class="text-h5">Editar rede</span>
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
                  v-model="hospital.name"
                  label="Nome"
                  required
                  hint="Nome da rede"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="hospital.address"
                  label="Endereço"
                  hint="Endereço da rede"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="hospital.company_id"
                  label="Rede hospitalar"
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
            @click="saveHospitalInfo()"
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
    name: "HospitalsList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      hospitals: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: '',
        dialog: false,
        dialogLoading: false,
        hospital: null,
      }
    },
    methods: {
      async editItem (item) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/hospital/getById/${item.id}`)

        if(response){
          setTimeout(()=>{
            this.hospital = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("erro ao carregar hospitais");
        }
      },

      async deleteItem (item) {
        if(confirm("Certeza que deseja deletar?")){
          const response = await this.$axios.delete(`/hospital/deleteById/${item.id}`)
          const {hospital} = response.data
          if (hospital.id) {
            alert("Rede deletada com sucesso")
            this.$router.go()
          }
        }
      },

      async saveHospitalInfo(){
        try{
          await this.$axios.put("/hospital/updateById", this.hospital)
          await alert("Rede atualizada com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>