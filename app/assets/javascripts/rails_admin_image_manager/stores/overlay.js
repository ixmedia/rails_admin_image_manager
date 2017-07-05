const overlayStore = {
  namespaced: true,
  state: {
    showInsertOverlay: false
  },
  mutations: {
    SET_SHOW_INSERT_OVERLAY (state, value) {
      state.showInsertOverlay = value
    }
  },
  actions: {
    showInsertOverlay ({ commit, state }, value) {
      state.showInsertOverlay
      commit('SET_SHOW_INSERT_OVERLAY', value)
    }
  }
}

export default overlayStore
