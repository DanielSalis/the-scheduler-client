<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="add"
      >
        <v-text-field
          v-model="bedInfo.name"
          :rules="nameRules"
          solo
          label="Nome do Leito"
          required
        />

        <v-select
          v-model="bedInfo.classification_id"
          :items="classifications"
          :rules="classificationsRule"
          item-text="name"
          item-value="id"
          label="Classificação"
          solo
        />

        <v-select
          v-model="bedInfo.unity_id"
          :items="unities"
          :rules="unitiesRule"
          item-text="name"
          item-value="id"
          label="Unidades"
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
    name: "BedsAdd",
    props: {
      unities: {
        required: true,
        type: Array
      },
      classifications: {
        required: true,
        type: Array
      },
    },
    data() {
      return {
        availableHospitals: null,
        bedInfo: {
          name: '',
          unity_id: '',
          classification_id: ''
        },
        nameRules: [
          v => !!v || 'Nome é necessário',
          v => v.length >= 10 || 'Nome precisa ter no mínimo 8 caracteres',
        ],
        classificationsRule: [
          v => !!v || 'Classificação é necessária',
        ],
        unitiesRule: [
          v => !!v || 'Unidade é necessária',
        ],
      }
    },
    methods: {
      async add(){
        await this.$axios.post("/bed/create", this.bedInfo).then((response)=>{
          console.log(response);
          alert("Unidade criada com sucesso!")
          this.$router.go('/admin/beds')
        }).catch(error=>{
          alert(`Erro ao criar unidade: ${error.response.data.error}`)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>