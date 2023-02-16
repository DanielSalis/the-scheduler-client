<template>
  <div class="admin-page">
    <v-card
      rounded
      class="admin-page__content"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          solo
          :rules="emailRules"
          label="email"
          required
        />

        <v-text-field
          v-model="password"
          solo
          :rules="passwordRules"
          label="senha"
          required
        />

        <v-btn
          block
          color="primary"
          class="mr-4"
          @click="validate"
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  data () {
    return {
      error: false,
      email: null,
      password: null
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 800px) {
    align-items: center;
  }
}

.admin-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 400px;
  width: 400px;
}
</style>
