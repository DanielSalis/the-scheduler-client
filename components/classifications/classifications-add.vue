<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="addCompany"
      >
        <v-text-field
          v-model="classificationInfo.name"
          :rules="nameRules"
          solo
          label="Nome da classificação"
          required
        />

        <v-text-field
          v-model="classificationInfo.address"
          :rules="colorRules"
          solo
          label="Cor"
          required
        />

        <v-text-field
          v-model="classificationInfo.estimated_time"
          :rules="estimatedTimeRule"
          solo
          label="Tempo estimado"
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
        classificationInfo: {
          name: '',
          color: '',
          estimated_time: 0
        },
        nameRules: [
          v => !!v || 'Nome é necessário',
          v => v.length >= 10 || 'Nome precisa ter no mínimo 8 caracteres',
        ],
        colorRules: [
          v => !!v || 'Campo Cor é necessário',
        ],
        estimatedTimeRule: [
          v => !!v || 'Tempo estimado é necessário',
          v => v > 0 || 'Tempo precisa ser maior que 0',
        ],
      }
    },
    methods: {
      async addCompany(){
        await this.$axios.post("/company/create", this.classificationInfo).then((response)=>{
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