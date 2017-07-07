const overlayStore = {
  namespaced: true,
  state: {
    showInsertOverlay: false,
    showProgress: false
  },
  mutations: {
    SET_SHOW_INSERT_OVERLAY (state, value) {
      state.showInsertOverlay = value
    },
    SET_SHOW_PROGRESS_OVERLAY (state, value) {
      state.showProgress = value
    }
  },
  actions: {
    showInsertOverlay ({ commit, state }, value) {
      commit('SET_SHOW_INSERT_OVERLAY', value)
    },
    showProgressOverlay ({ commit, state }, value) {
      commit('SET_SHOW_PROGRESS_OVERLAY', value)
    },
  }
}

export default overlayStore
