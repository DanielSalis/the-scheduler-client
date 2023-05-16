export const state = () => ({
  unity: null,
  date: null,
  availableShifts: [],
  shift: null,
  availiableBeds: [],
  classifications: [],
  workers: [],
});

export const getters = {
  getUnity: (state) => state.unity,
  getDate: (state) => state.date,
  getAvailableShifts: (state) => state.availableShifts,
  getShift: (state) => state.shift,
  getavAiliableBeds: (state) => state.availiableBeds,
  getClassifications: (state) => state.classifications,
  getWorkers: (state) => state.workers,
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
    state.availiableBeds = value;
  },
  setClassifications(state, value) {
    state.classifications = value;
  },
  setWorkers(state, value) {
    state.workers = value;
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

  async fetchAllClassifications(){
    await this.$axios.get(`/classification/getAll`).then((response)=>{
      state.commit("setClassifications", response.data);
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
    state.commit("setClassifications", value);
  },
  async setWorkers(state, value) {
    state.commit("setWorkers", value);
  },
};
