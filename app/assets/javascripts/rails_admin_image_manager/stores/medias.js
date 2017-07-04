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
      for (var i = 0; i < tags.length; i++) {
        let tag = tags[i]
        state.currentImgTags.push = tag
      }
    }
  },
  actions: {
    useImage ({ commit, state }, data) {
      // this.$http.get('#', data.id).then(() => {
        // La reference opener devra être seté au click du bouton qui ouvre notre outils .. je me comprends
        // window.opener.editor.insertText("balise_image_généré");
        // window.close
      // })
    },
    setCurrentImg ({commit, state}, imgData) {
      console.log(imgData);
      if (imgData.title) commit('UPDATE_CURRENT_IMG_TITLE', imgData.title)
      if (imgData.copyright) commit('UPDATE_CURRENT_IMG_COPYRIGHT', imgData.copyright)
      if (imgData.description) commit('UPDATE_CURRENT_IMG_DESC', imgData.description)
      if (imgData.src) commit('UPDATE_CURRENT_IMG_SRC', imgData.src)
      if (imgData.tags) commit('UPDATE_CURRENT_IMG_TAGS', imgData.tags)
    },

    updateSrc ({commit, state}, src) {
      commit('UPDATE_CURRENT_IMG_SRC', src)
    }
  }
}

export default mediasStore
