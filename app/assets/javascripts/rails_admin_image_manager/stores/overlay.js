const overlayStore = {
  namespaced: true,
  state: {
    showInsertOverlay: false,
    showProgress: false,
    notifications: []
  },
  mutations: {
    SET_SHOW_INSERT_OVERLAY (state, value) {
      state.showInsertOverlay = value
    },
    SET_SHOW_PROGRESS_OVERLAY (state, value) {
      state.showProgress = value
    },
    PUSH_NOTIFICATION (state, object) {
      state.notifications.push(object)
    },
    POP_NOTIFICATION (state) {
      state.notifications.pop()
    }
  },
  actions: {
    showInsertOverlay ({ commit, state }, value) {
      commit('SET_SHOW_INSERT_OVERLAY', value)
    },
    showProgressOverlay ({ commit, state }, value) {
      commit('SET_SHOW_PROGRESS_OVERLAY', value)
    },
    pushNotification ({ commit, state }, notificationObject) {
      commit('PUSH_NOTIFICATION', notificationObject)
      let t = setTimeout(() => {
        commit('POP_NOTIFICATION')
      }, 2000)
    },

  }
}

export default overlayStore
