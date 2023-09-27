<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="addCompany"
      >
        <v-text-field
          v-model="companyInfo.name"
          :rules="nameRules"
          solo
          label="Nome da rede"
          required
        />

        <v-text-field
          v-model="companyInfo.address"
          :rules="addressRules"
          solo
          label="Endereço da rede"
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
    name: "ClassificationsAdd",
    data() {
      return {
        companyInfo: {
          name: '',
          address: '',
        },
        nameRules: [
          v => !!v || 'Nome é necessário',
          v => v.length >= 10 || 'Nome precisa ter no mínimo 8 caracteres',
        ],
        addressRules: [
          v => !!v || 'Endereço é necessário',
        ],
      }
    },
    methods: {
      async addCompany(){
        await this.$axios.post("/company/create", this.companyInfo).then((response)=>{
          console.log(response);
          alert("Rede criada com sucesso!")
          this.$router.go('/admin/companies')
        }).catch(error=>{
          alert(`Erro ao criar Rede: ${error.response.data.error}`)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>