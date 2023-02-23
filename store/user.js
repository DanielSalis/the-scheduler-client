export const state = () => ({
  email: {},
  name: {},
  token: null,
})

export const getters = {
  email: state => state.email,
  name: state => state.name,
  token: state => state.token,
}

export const mutations = {
  setEmail(state, value) {
    state.email = value;
  },
  setName(state, value) {
    state.name = value;
  },
  setToken(state, value) {
    state.token = value;
  },
}