const ckEditor = {
  namespaced: true,
  state: {
    ckId: "",
    ckFun: "",
  },
  mutations: {
    SET_CK_ID(state, value) {
      state.ckId = value
    },
    SET_CK_FUN(state, value) {
      state.ckFun = value
    }
  },
  actions: {
    setCkFun({commit}, value) {
      commit('SET_CK_FUN', value)
    },
    setCkId({commit}, value) {
      commit('SET_CK_ID', value)
    }
  }
}

export default ckEditor
