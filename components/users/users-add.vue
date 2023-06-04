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

        <v-expansion-panels class="mb-5">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <strong>Vínculo com unidade</strong> (opcional)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <span class="text-subtitle-1">*Vincule o usuário com sua unidade correspondente</span>
              <v-select
                v-model="userInfo.companyId"
                class="mt-2"
                :items="companiesOptions"
                item-text="name"
                item-value="id"
                label="Rede hospitalar"
                solo
              />
              <v-select
                v-model="userInfo.hospitalId"
                :items="hospitalsOptions"
                item-text="name"
                item-value="id"
                label="Hospital"
                solo
                :disabled="userInfo.companyId === ''"
              />
              <v-select
                v-model="userInfo.unityId"
                :items="unitiesOptions"
                item-text="name"
                item-value="id"
                label="Unidade"
                solo
                :disabled="userInfo.hospitalId=== ''"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

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
          userRoleId: null,
          companyId: null,
          hospitalId: null,
          unityId: null
        },
        userRoleOptions: [],
        companiesOptions: [],
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
    computed: {
      hospitalsOptions(){
        if(this.userInfo.companyId && this.companiesOptions){
          const company = this.companiesOptions.find((company)=>{
            return company.id === this.userInfo.companyId
          })
          return company["Hospital"]
        }
        return []
      },
      unitiesOptions(){
        if(this.userInfo.hospitalId && this.hospitalsOptions){
          const hospital = this.hospitalsOptions.find((hospital)=>{
            return hospital.id === this.userInfo.hospitalId
          })
          return hospital["Unity"]
        }
        return []
      }
    },
    async beforeMount() {
      try{
        const userRoleResponse = await this.$axios.get("/userRole/getAll");
        const companyResponse= await  this.$axios.get("/company/getAll");
        this.userRoleOptions = userRoleResponse.data
        this.companiesOptions = companyResponse.data
      }catch(error){
        console.log(error);
        throw new Error(error);
      }
    },
    methods: {
      async addUser(){
        console.log(this.userInfo);
        await this.$axios.post("/user/create", this.userInfo).then((response)=>{
          console.log(response);
          alert("Usuário criado com sucesso!")
          this.$router.go('/admin/users')
        }).catch(error=>{
          alert(`Erro ao criar usuário: ${error.response.data.error}`)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>