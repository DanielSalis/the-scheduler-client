<template lang="">
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="addUser"
      >
        <v-text-field
          v-model="userInfo.name"
          solo
          label="Nome"
          required
        />

        <v-text-field
          v-model="userInfo.email"
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
          :items="['admin', 'enfermeiro', 'tecnico']"
          label="Tipo de Usuário"
          solo
        />

        <v-text-field
          v-model="userInfo.password"
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
        }
      }
    },
    methods: {
      addUser(){
        alert(JSON.stringify(this.userInfo))
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>