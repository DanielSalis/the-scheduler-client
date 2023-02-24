export const state = () => ({
  authData: {}
})

export const getters = {
  getAuthData: state => state.authData,
}

export const mutations = {
  setAuthData(state, value) {
    state.authData = value;
  },
}

export const actions = {
  async setAuthData(state, value) {
    state.commit("setAuthData", value)
  },
}