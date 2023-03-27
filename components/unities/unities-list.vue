<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="unities"
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
      <v-card v-if="!dialogLoading && unity">
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
                  v-model="unity.name"
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
                  v-model="unity.location"
                  label="Localização"
                  hint="Andar, sala, etc..."
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="unity.id"
                  label="Identificador da unidade"
                  disabled
                  hint=""
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="unity.hospital_id"
                  label="Identificador do hospital"
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
    name: "UnitiesList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      unities: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: '',
        dialog: false,
        dialogLoading: false,
        unity: {},
      }
    },
    methods: {
      async editItem (item) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/unity/getById/${item.id}`)

        if(response){
          setTimeout(()=>{
            this.unity = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("erro ao carregar unidades");
        }
      },

      async deleteItem (item) {
        if(confirm("Certeza que deseja deletar?")){
          const response = await this.$axios.delete(`/unity/deleteById/${item.id}`)
          const {unity} = response.data
          if (unity.id) {
            alert("Rede deletada com sucesso")
            this.$router.go()
          }
        }
      },

      async saveInfo(){
        try{
          await this.$axios.put("/unity/updateById", this.unity)
          await alert("Unidade atualizada com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>