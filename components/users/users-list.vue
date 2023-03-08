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
      :headers="headers"
      :items="users"
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
      <v-card v-if="!dialogLoading && user">
        <v-card-title>
          <span class="text-h5">Editar usuário</span>
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
                  v-model="user.name"
                  label="Nome"
                  required
                  hint="Nome do usuário"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  hint="Email do usuário"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="user.code"
                  label="Código"
                  hint="Código do usuário"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="12"
              >
                <v-text-field
                  v-model="user.id"
                  label="Id"
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
                  v-model="newUserPassword"
                  label="Senha"
                  hint="Editar somente quando necessário"
                  type="password"
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
            @click="saveNewUserInfo()"
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
    name: "UsersList",
    props: {
      headers: {
        required: true,
        type: Array
      },
      users: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
        search: '',
        dialog: false,
        dialogLoading: false,
        user: null,
        newUserPassword: '',
      }
    },
    methods: {
      async editItem (user) {
        this.dialog = true
        this.dialogLoading = true

        const response = await this.$axios.get(`/user/getById/${user.id}`)

        if(response){
          setTimeout(()=>{
            this.user = response.data
            this.dialogLoading = false
          },1000)
        }
        else{
          alert("erro ao carregar usuário");
        }
      },

      async deleteItem (item) {
        if(confirm("Certeza que deseja deletar?")){
          const response = await this.$axios.delete(`/user/deleteById/${item.id}`)
          if (response.data.id) {
            alert("Usuário deletado com sucesso")
            this.$router.go()
          }
        }
      },

      async saveNewUserInfo(){
        try{
          if(this.newUserPassword.length > 0){
            this.user.password = this.newUserPassword
          }
          await this.$axios.put("/user/updateById", this.user)
          await alert("Usuário atualizado com sucesso")
          this.$router.go()
        }catch(e){
          console.log(e);
        }
      }
    },
  }
</script>