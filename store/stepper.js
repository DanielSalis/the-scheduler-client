export const state = () => ({
  unity: null,
  date: null,
  availableShifts: [],
  shift: null,
  availiableBeds: [],
  classifications: [],
  availableUsers: [],
  selectedUsers: [],
});

export const getters = {
  getUnity: (state) => state.unity,
  getDate: (state) => state.date,
  getAvailableShifts: (state) => state.availableShifts,
  getShift: (state) => state.shift,
  getavAiliableBeds: (state) => state.availiableBeds,
  getClassifications: (state) => state.classifications,
  getAvailableUsers: (state) => state.availableUsers,
  getSelectedUsers: (state) => state.selectedUsers,
};

export const mutations = {
  setUnity(state, value) {
    state.unity = value;
  },
  setDate(state, value) {
    state.date = value;
  },
  setAvailableShifts(state, value) {
    state.availableShifts = value;
  },
  setShift(state, value) {
    state.shift = value;
  },
  setAvailiableBeds(state, value) {
    console.log("COMMITOU");
    state.availiableBeds = value;
  },
  setClassifications(state, value) {
    state.classifications = value;
  },
  setAvailableUsers(state, value){
    state.availableUsers = value
  },
  setSelectedUsers(state, value) {
    state.selectedUsers = value;
  },
};

export const actions = {

  async fetchShifts(state){
    await this.$axios.get(`/shift/getAll`).then((response)=>{
      state.commit("setAvailableShifts", response.data);
    }).catch(err=>{
      console.log(err);
    })
  },

  async fetchBeds(state, unity) {
    const {id} = unity;
    console.log(id);
    await this.$axios
      .get(`/bed/getAllByUnityId/${id}`)
      .then((response) => {
        state.commit("setAvailiableBeds", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async fetchAllClassifications(state){
    await this.$axios.get(`/classification/getAll`).then((response)=>{
      console.log(response.data);
      state.commit("setClassifications", response.data);
    }).catch(err=>{
      console.log(err);
    })
  },

    async updateBedClassification({state, commit}, payload){
      const {event, index, item, unity} = payload

      const currentBed = {
        ...item,
        classification:event,
        classification_id: event.id,
        unity_id: unity.id
      }
      await this.$axios.put(`/bed/updateById`, currentBed).then((response)=>{
        console.log(response.data);
      }).catch(err=>{
        console.log(err);
      })

      const aux = state.availiableBeds;
      aux[index] = currentBed
      commit("setAvailiableBeds", aux)
    },

  async fetchUsers(state, unity){
    const {id} = unity
    await this.$axios.get(`/user/getAllByUnityId/${id}`).then((response)=>{
      state.commit("setAvailableUsers", response.data)
    }).catch(err=>{
      console.log(err);
    })
  },

  async setUnity(state, value) {
    state.commit("setUnity", value);
  },
  async setDate(state, value) {
    state.commit("setDate", value);
  },
  async setShift(state, value) {
    state.commit("setShift", value);
  },
  async setAvailiableBeds(state, value) {
    state.commit("setAvailiableBeds", value);
  },
  async setClassifications(state, value) {
    console.log(state,value);
    state.commit("setClassifications", value);
  },
  async setSelectedUsers(state, value) {
    state.commit("setSelectedUsers", value);
  },
};
