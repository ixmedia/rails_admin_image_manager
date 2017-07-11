const overlayStore = {
  namespaced: true,
  state: {
    showInsertOverlay: false,
    showProgress: false,
    notifications: [],
    confirmation: {
      msg: '',
      callback: null
    }
  },
  mutations: {
    SET_SHOW_INSERT_OVERLAY (state, value) {
      state.showInsertOverlay = value
    },
    SET_SHOW_PROGRESS_OVERLAY (state, value) {
      state.showProgress = value
    },
    PUSH_CONFIRMATION (state, object) {
      if(object.hasOwnProperty('msg')) state.confirmation.msg = object.msg
      if(object.hasOwnProperty('callback')) state.confirmation.callback = object.callback
    },
    CLEAR_CONFIRMATION (state) {
      state.confirmation.msg = ''
      state.confirmation.callback = null
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
    pushConfirmation({ commit, state }, confirmationObject) {
      commit('PUSH_CONFIRMATION', confirmationObject)
    },
    clearConfirmation({commit}) {
      commit('CLEAR_CONFIRMATION')
    }

  }
}

export default overlayStore
