<template>
  <div
    class="admin-page"
    tabindex="0"
    @keyup.enter="loginUser"
  >
    <v-card
      rounded
      class="admin-page__content"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="loginUser"
      >
        <v-text-field
          v-model="email"
          solo
          label="email"
          required
        />

        <v-text-field
          v-model="password"
          type="password"
          solo
          label="senha"
          required
        />

        <v-btn
          block
          color="primary"
          class="mr-4"
          validate-on="submit"
          type="submit"
        >
          Entrar
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  export default {
    name: 'LoginPage',
    layout: 'login',
    data () {
      return {
        valid: true,
        error: false,
        email: null,
        password: null,
        dataApi: null
      }
    },
    methods: {
      ...mapActions("auth",['setAuthData']),

      async loginUser() {
        try {
          const userData = {
            email:this.email,
            password: this.password,
          }
          const response = await this.$axios.post('/user/auth', userData)
          if(response) {
            this.$cookies.set('auth', response.data, {
              path: '/',
              maxAge: 60 * 60 * 24 * 1
            })
            this.$router.push('/')
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
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
