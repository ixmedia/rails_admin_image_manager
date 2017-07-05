import axios from 'axios';

const mediasStore = {
  namespaced: true,
  state: {
    currentImgTitle: "",
    currentImgCopyright: "",
    currentImgDescription: "",
    currentImgSrc: "",
    currentImgTags: []
  },
  mutations: {
    UPDATE_CURRENT_IMG_TITLE (state, title) {
      state.currentImgTitle = title
    },
    UPDATE_CURRENT_IMG_COPYRIGHT (state, copy) {
      state.currentImgCopyright = copy
    },
    UPDATE_CURRENT_IMG_DESC (state, desc) {
      state.currentImgDescription = desc
    },
    UPDATE_CURRENT_IMG_SRC (state, src) {
      state.currentImgSrc = src
    },
    UPDATE_CURRENT_IMG_TAGS (state, tags) {
      state.currentImgTags = []
      for (var i = 0; i < tags.length; i++) {
        let tag = tags[i]
        state.currentImgTags.push(tag)
      }
    },
    ADD_CURRENT_IMG_TAG(state, string) {
      state.currentImgTags.push(string)
    },
    REMOVE_CURRENT_IMG_TAG(state, string) {
      let index = state.currentImgTags.indexOf(string)
      if (index >= 0) {
        state.currentImgTags.splice(index, 1)
      }
    },
  },
  actions: {
    useImage ({ commit, state }, data) {
      // this.$http.get('#', data.id).then((data) => {
        // La reference opener devra être seté au click du bouton qui ouvre notre outils .. je me comprends
        // window.opener.editor.insertText("balise_image_généré");
        // window.close
      // })
    },
    setCurrentImg ({commit, state}, imgData) {
      if (imgData.title) commit('UPDATE_CURRENT_IMG_TITLE', imgData.title)
      if (imgData.copyright) commit('UPDATE_CURRENT_IMG_COPYRIGHT', imgData.copyright)
      if (imgData.description) commit('UPDATE_CURRENT_IMG_DESC', imgData.description)
      if (imgData.src) commit('UPDATE_CURRENT_IMG_SRC', imgData.src)
      if (imgData.tags) commit('UPDATE_CURRENT_IMG_TAGS', imgData.tags)
    },
    fetchSingleImage({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/${id}`)
        .then((response) => {
          dispatch('setCurrentImg', response.data)
          resolve()
        })
        .catch(reject)
      })
    },
    updateSrc ({commit, state}, src) {
      commit('UPDATE_CURRENT_IMG_SRC', src)
    },
    addTag ({ commit }, string) {
      commit('ADD_CURRENT_IMG_TAG', string)
    },
    removeTag ({ commit }, string) {
      commit('REMOVE_CURRENT_IMG_TAG', string)
    }
  }
}

export default mediasStore
