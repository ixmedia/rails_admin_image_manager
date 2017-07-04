const mediasStore = {
  namespaced: true,
  state: {
    currentImg: null
  },
  mutations: {
    SET_CURRENT_IMG (state, imageData) {
      state.currentImg = imageData
    }
  },
  actions: {
    useImage ({ commit, state }, data) {
      // this.$http.get('#', data.id).then(() => {
        // La reference opener devra être seté au click du bouton qui ouvre notre outils .. je me comprends
        // window.opener.editor.insertText("balise_image_généré");
        // window.close
      // })
    }
  }
}

export default mediasStore
