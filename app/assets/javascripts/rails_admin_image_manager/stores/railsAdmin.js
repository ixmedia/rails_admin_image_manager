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
      // Generating new dynamic image size before sending it back to CKEDITOR
      axios.get(`/images/${idImage}?width=250&height=250`).then((response) => {
        dispatch('overlayStore/showProgressOverlay', false, {root:true})
        window.opener.insertImageManagerMedia(idImage, state.inputId, response.data.src_for_wysiwyg)
        window.close()
      })
    }
  }
}

export default railsAdmin
