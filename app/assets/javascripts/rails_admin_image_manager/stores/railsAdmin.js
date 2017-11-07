import axios from 'axios'
const railsAdmin = {
  namespaced: true,
  state: {
    inputId: ''
  },
  mutations: {
    SET_INPUT_ID (state, id) {
      state.inputId = id
    }
  },
  actions: {
    setInputId ({ commit}, id) {
      commit('SET_INPUT_ID', id)
    },
    insertImage ({commit, state, dispatch}, idImage) {
      dispatch('overlayStore/showProgressOverlay', true, {root:true})
      // Generating new dynamic image size before sending it back
      axios.get(`/images/${idImage}?width=0&height=0`).then((response) => {
        dispatch('overlayStore/showProgressOverlay', false, {root:true})
        window.opener.insertImageManagerMedia(idImage, state.inputId, response.data.image.src_for_wysiwyg)
        window.close()
      })
    }
  }
}

export default railsAdmin
