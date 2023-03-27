<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="addHospital"
      >
        <v-text-field
          v-model="hospitalInfo.name"
          :rules="nameRules"
          solo
          label="Nome do hospital"
          required
        />

        <v-text-field
          v-model="hospitalInfo.address"
          :rules="addressRules"
          solo
          label="Endereço do hospital"
          required
        />

        <v-select
          v-model="hospitalInfo.company_id"
          :items="availableCompanies"
          :rules="companyRule"
          item-text="name"
          item-value="id"
          label="Qual rede pertence"
          solo
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
    name: "HospitalsAdd",
    data() {
      return {
        availableCompanies: null,
        hospitalInfo: {
          name: '',
          address: '',
          company_id: ''
        },
        nameRules: [
          v => !!v || 'Nome é necessário',
          v => v.length >= 10 || 'Nome precisa ter no mínimo 8 caracteres',
        ],
        addressRules: [
          v => !!v || 'Endereço é necessário',
        ],
        companyRule: [
          v => !!v || 'Rede é necessária',
        ],
      }
    },
    async beforeMount() {
      this.availableCompanies = await this.getAllCompanies()
    },
    methods: {
      async addHospital(){
        await this.$axios.post("/hospital/create", this.hospitalInfo).then((response)=>{
          console.log(response);
          alert("Rede criada com sucesso!")
          this.$router.go('/admin/hospitals')
        }).catch(error=>{
          alert(`Erro ao criar Rede: ${error.response.data.error}`)
        })
      },

      async getAllCompanies() {
        const response = await this.$axios.get('/company/getAll')
        if(response.data){
          return response.data
        }else{
          alert(`Erro ao carregar Redes hospitalares:`)
          return null
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>