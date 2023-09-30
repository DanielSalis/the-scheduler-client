<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquise aqui pela informação que desejar (id, nome, etc)"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="companies"
      sort-by="calories"
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
      <v-card v-if="!dialogLoading && company">
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
                  v-model="company.name"
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
                  v-model="company.address"
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
                  v-model="company.id"
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
            @click="saveCompanyInfo()"
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
    name: "CompaniesList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      companies: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: '',
        dialog: false,
        dialogLoading: false,
        company: null,
      }
    },
    methods: {
      async editItem (company) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/company/getById/${company.id}`)

        if(response){
          setTimeout(()=>{
            this.company = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("erro ao carregar rede");
        }
      },

      async deleteItem (item) {
        if(confirm("Certeza que deseja deletar?")){
          const response = await this.$axios.delete(`/company/deleteById/${item.id}`)
          const {company} = response.data
          if (company.id) {
            alert("Rede deletada com sucesso")
            this.$router.go()
          }
        }
      },

      async saveCompanyInfo(){
        try{
          await this.$axios.put("/company/updateById", this.company)
          await alert("Rede atualizada com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>