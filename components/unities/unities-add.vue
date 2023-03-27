<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="add"
      >
        <v-text-field
          v-model="unityInfo.name"
          :rules="nameRules"
          solo
          label="Nome do hospital"
          required
        />

        <v-text-field
          v-model="unityInfo.location"
          :rules="locationRules"
          solo
          label="Endereço do hospital"
          required
        />

        <v-select
          v-model="unityInfo.hospital_id"
          :items="availableHospitals"
          :rules="hospitalRule"
          item-text="name"
          item-value="id"
          label="Qual hospital pertence?"
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
    name: "UnitiesAdd",
    data() {
      return {
        availableHospitals: null,
        unityInfo: {
          name: '',
          location: '',
          hospital_id: ''
        },
        nameRules: [
          v => !!v || 'Nome é necessário',
          v => v.length >= 10 || 'Nome precisa ter no mínimo 8 caracteres',
        ],
        locationRules: [
          v => !!v || 'Endereço é necessário',
        ],
        hospitalRule: [
          v => !!v || 'Rede é necessária',
        ],
      }
    },
    async beforeMount() {
      this.availableHospitals = await this.getAllHospitals()
    },
    methods: {
      async add(){
        await this.$axios.post("/unity/create", this.unityInfo).then((response)=>{
          console.log(response);
          alert("Unidade criada com sucesso!")
          this.$router.go('/admin/unitys')
        }).catch(error=>{
          alert(`Erro ao criar unidade: ${error.response.data.error}`)
        })
      },

      async getAllHospitals() {
        const response = await this.$axios.get('/hospital/getAll')
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