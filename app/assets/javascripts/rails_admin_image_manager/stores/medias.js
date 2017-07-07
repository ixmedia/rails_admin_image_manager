import axios from 'axios';

const mediasStore = {
  namespaced: true,
  state: {
    currentImgId: "",
    currentImgTitle: "",
    currentImgCopyright: "",
    currentImgDescription: "",
    currentImgSrc: "",
    currentImgTags: [],
    imageListItems: []
  },
  mutations: {
    UPDATE_CURRENT_IMG_ID (state, id) {
      state.currentImgId = id
    },
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
    ADD_TO_LIST_ITEMS(state, items) {
      for (var i = 0; i < items.length; i++) {
        let item = items[i]
        state.imageListItems.push(item)
      }
    },
    ADD_CURRENT_IMG_TAG(state, string) {
      state.currentImgTags.push(string)
    },
    CLEAR_IMG_LISTING(state){
      state.imageListItems = []
    },
    REMOVE_CURRENT_IMG_TAG(state, string) {
      let index = state.currentImgTags.indexOf(string)
      if (index >= 0) {
        state.currentImgTags.splice(index, 1)
      }
    },
  },
  getters: {
    imageObject: (state) => {
      return {
        image: {
          id: state.currentImgId,
          name: state.currentImgTitle,
          copyright: state.currentImgCopyright,
          description: state.currentImgDescription,
          src: state.currentImgSrc,
          tags_list: state.currentImgTags
        }
      }
    }
  },
  actions: {
    useImage ({ commit, state, dispatch, rootState}, data) {
      dispatch('overlayStore/showProgressOverlay', true, {root:true})

      // Generating new dynamic image size before sending it back to CKEDITOR
      axios.get(`/images/${state.currentImgId}?width=${data[0]}&height=${data[1]}`).then((response) => {
        dispatch('overlayStore/showProgressOverlay', false, {root:true})
        window.opener.CKEDITOR.tools.callFunction(rootState.ckEditorStore.ckId, response.data.src_for_wysiwyg, state.currentImgId, state.currentImgTitle);
        window.close()
      })

    },
    setCurrentImg ({commit, state}, imgData) {
      if (imgData.id != undefined) commit('UPDATE_CURRENT_IMG_ID', imgData.id)
      if (imgData.name != undefined) commit('UPDATE_CURRENT_IMG_TITLE', imgData.name)
      if (imgData.copyright != undefined) commit('UPDATE_CURRENT_IMG_COPYRIGHT', imgData.copyright)
      if (imgData.description != undefined) commit('UPDATE_CURRENT_IMG_DESC', imgData.description)
      if (imgData.src != undefined) commit('UPDATE_CURRENT_IMG_SRC', imgData.src)
      if (imgData.tags_list != undefined) commit('UPDATE_CURRENT_IMG_TAGS', imgData.tags_list)
    },
    saveCurrentImg ({commit, state, getters}) {
      console.log(state.currentImgId);
      if (state.currentImgId != '') {
        console.log('in if');
        axios.put('/images', getters.imageObject).then((response)=> {
          console.log(response);
        }).catch((response) => {
          console.log(response);
        })
      } else {
        axios.post('/images',getters.imageObject).then((response)=> {
          console.log(response);
        }).catch((response) => {
          console.log(response);
        })
      }
    },
    deleteImg ({ commit }, id) {
      axios.delete({params: {id: id}})
    },
    fetchImageForPage({commit}, pageNumber) {
      axios.get('images.json', {page: pageNumber})
      .then((response) => {
        commit('ADD_TO_LIST_ITEMS', response.data.items)
      })
    },
    fetchSingleImage({ dispatch, rootDispatch}, id) {
      dispatch('overlayStore/showProgressOverlay', true, {root:true})
      return new Promise((resolve, reject) => {
        axios.get(`/images/${id}`)
        .then((response) => {
          dispatch('setCurrentImg', response.data)
          dispatch('overlayStore/showProgressOverlay', false, {root:true})
          resolve()
        })
        .catch(()=> {
          dispatch('overlayStore/showProgressOverlay', false, {root:true})
          reject()
        })
      })
    },
    clearCurrentImg({dispatch}){
      let clearObject = {
        id:'',
        name:'',
        copyright:'',
        description:'',
        src:'',
        tags_list: []
      }
      dispatch('setCurrentImg', clearObject)
    },
    clearImgListing({ commit }){
      commit('CLEAR_IMG_LISTING')
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
