<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="addUser"
      >
        <v-text-field
          v-model="userInfo.name"
          :rules="nameRules"
          solo
          label="Nome"
          required
        />

        <v-text-field
          v-model="userInfo.email"
          :rules="emailRules"
          solo
          label="Email"
          required
        />

        <v-text-field
          v-model="userInfo.code"
          type="text"
          solo
          label="Matrícula"
          required
        />

        <v-select
          v-model="userInfo.userRoleId"
          :items="userRoleOptions"
          :rules="userRoleRule"
          item-text="name"
          item-value="id"
          label="Tipo de Usuário"
          solo
        />

        <v-text-field
          v-model="userInfo.password"
          :rules="passwordRules"
          type="password"
          solo
          label="Senha"
          required
        />

        <v-btn
          block
          color="primary"
          class="mr-4"
          validate-on="submit"
          type="submit"
        >
          Adicionar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "UsersAdd",
    data() {
      return {
        userInfo: {
          name: '',
          email: '',
          password: '',
          code: '',
          userRoleId: null
        },
        userRoleOptions: [],
        nameRules: [
          v => !!v || 'Nome é necessário',
          v => v.length >= 10 || 'Nome precisa ter no mínimo 10 caracteres',
        ],
        emailRules: [
          v => !!v || 'Email é necessário',
          v => /.+@.+/.test(v) || 'Email precisa ser válido',
        ],
        passwordRules: [
          v => !!v || 'Senha é necessária',
        ],
        userRoleRule: [
          v => !!v || 'Função é necessária',
        ],
      }
    },
    async beforeMount() {
      try{
        const response = await this.$axios.get("/userRole/getAll");
        this.userRoleOptions = response.data
      }catch(error){
        console.log(error);
        throw new Error(error);
      }
    },
    methods: {
      async addUser(){
        await this.$axios.post("/user/create", this.userInfo).then((response)=>{
          console.log(response);
          alert("Usuário criado com sucesso!")
          this.$router.go('/admin/users')
        }).catch(error=>{
          alert(`Erro ao criar usuário: ${error.response.data.error}`)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>