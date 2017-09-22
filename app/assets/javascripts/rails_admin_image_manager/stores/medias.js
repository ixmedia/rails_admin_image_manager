import axios from 'axios';
import router from '../router';

const mediasStore = {
  namespaced: true,
  state: {
    currentImgId: "",
    currentImgTitle: "",
    currentImgCopyright: "",
    currentImgDescription: "",
    currentImgSrc: "",
    currentImgTags: [],
    imageListItems: [],
    maxImageListItems: -1,
    activeFilters: {
      tags: [],
      search: '',
      page: 1,
      date: '',
      title: ''
    },
    tags: [],
    errors: {}
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
    CLEAR_IMG_LISTING(state){
      state.imageListItems = []
    },
    SPLICE_IMG_LISTING(state, id){
      state.imageListItems.forEach((image, index) => {
        if (image.id == id) {
          state.imageListItems.splice(index, 1)
        }
      })
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
    SET_ERRORS(state, errorObject) {
      state.errors = errorObject
    },
    SET_MAX_IMAGE_LIST_ITEMS(state, value) {
      state.maxImageListItems = value
    },
    SET_TAGS_LIST(state, tags) {
      state.tags = []
      for (var i = 0; i < tags.length; i++) {
        let tag = tags[i]
        state.tags.push(tag)
      }
    },
    // tag is an id
    REMOVE_FROM_TAG_FILTERS(state, tag) {
      state.activeFilters.tags = _.without(state.activeFilters.tags, tag)
    },
    // tag is an id
    ADD_TO_TAG_FILTERS(state, tag) {
      if (!_.contains(state.activeFilters.tags, tag)) {
        state.activeFilters.tags.push(tag)
      }
    },
    SET_PAGE(state, page) {
      state.activeFilters.page = page
    },
    SET_QUERY(state, query){
      state.activeFilters.search = query
    },
    SET_FILTER(state, opts){
      state.activeFilters.date = ''
      state.activeFilters.title = ''
      state.activeFilters[opts[1]] = opts[0]
    }
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
          tags: state.currentImgTags
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
        window.opener.CKEDITOR.tools.callFunction(rootState.ckEditorStore.ckId, response.data.src_for_wysiwyg, state.currentImgId, state.currentImgTitle.replace(/"/g, '&quot;'));
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
      if (imgData.errors != undefined) commit('SET_ERRORS', imgData.errors)
    },
    saveCurrentImg ({dispatch, commit, state, getters}) {
      // Loading bar
      dispatch('overlayStore/showProgressOverlay', true, {root:true})

      if (state.currentImgId != '') {
        return dispatch('updateImg')
      } else {
        return dispatch('createImg')
      }
    },
    updateImg ({dispatch, commit, state, getters}) {
      return new Promise((resolve, reject) => {
        axios.put('/images', getters.imageObject).then((response)=> {

          // Notificating
          dispatch('overlayStore/pushNotification', {success: true, msg: 'Image mise à jour avec succès'}, {root:true})

          // Clearing errors object
          commit('SET_ERRORS', {})

          // hiding loading bar
          dispatch('overlayStore/showProgressOverlay', false, {root:true})
          resolve(response)
        }).catch((error) => {
          // hiding loading bar
          dispatch('overlayStore/showProgressOverlay', false, {root:true})

          // Error notification
          dispatch('overlayStore/pushNotification', {error: true, msg: 'Erreur lors de la mise à jour'}, {root:true})

          commit('SET_ERRORS', error.response.data)
          reject()
        })
      })
    },
    createImg ({dispatch, commit, state, getters}) {
      return new Promise((resolve, reject) => {
        axios.post('/images',getters.imageObject).then((response)=> {
          // Notificating
          dispatch('overlayStore/pushNotification', {success: true, msg: 'Image créé avec succès'}, {root:true})

          // Clearing errors object
          commit('SET_ERRORS', {})

          // Redirect
          dispatch('setCurrentImg', response.data)
          router.push({ name: 'root'})
          resolve(response)
        }).catch((error) => {
          // hiding loading bar
          dispatch('overlayStore/showProgressOverlay', false, {root:true})

          dispatch('overlayStore/pushNotification', {error: true, msg: 'Erreur lors de la création'}, {root:true})
          commit('SET_ERRORS', error.response.data)
          reject()
        })
      })
    },
    deleteImg ({ commit }, id) {
      axios.delete({params: {id: id}})
    },

    fetchImage({commit, dispatch, state}) {
      return new Promise((resolve, reject) => {

        // Showing progress bar
        dispatch('overlayStore/showProgressOverlay', true, {root:true})

        // GET WITH PARAMS
        axios.get('images.json', {params: state.activeFilters})
        // SUCCESS
        .then((response) => {
          if(state.maxImageListItems == -1) commit('SET_MAX_IMAGE_LIST_ITEMS', response.data.total_count)
          // Calling mutation
          commit('ADD_TO_LIST_ITEMS', response.data.items)

          // Hiding progess bar
          dispatch('overlayStore/showProgressOverlay', false, {root:true})
          resolve()
        })
        // ERROR
        .catch((error) => {

          // hiding loading bar
          dispatch('overlayStore/showProgressOverlay', false, {root:true})

          // Notificating
          dispatch('overlayStore/pushNotification', {success: true, msg: 'Problème lors du fetch'}, {root:true})
          reject()
        })
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
        tags_list: [],
        errors: {}
      }
      dispatch('setCurrentImg', clearObject)
    },
    fetchTags({commit, dispatch}){
      return new Promise((resolve, reject) => {
        axios.get(`/tags.json`).then((response)=>{
          commit('SET_TAGS_LIST', response.data)
          resolve()
        })
        .catch((error) => {
          dispatch('overlayStore/pushNotification', {error: true, msg: 'Problème avec les tags'}, {root:true})
          reject()
        })

    })
    },
    deleteImg({commit, dispatch}, idImage) {
      dispatch('overlayStore/showProgressOverlay', true, {root:true})
      return new Promise(function(resolve, reject) {
        axios.delete(`/images`, {params: {id: idImage}})
        .then((response)=>{
          dispatch('overlayStore/showProgressOverlay', false, {root:true})
          dispatch('overlayStore/pushNotification', {success: true, msg: 'Image supprimé avec succès'}, {root:true})
          commit('SPLICE_IMG_LISTING', idImage)
        })
        .catch((error) => {
          dispatch('overlayStore/showProgressOverlay', false, {root:true})
          dispatch('overlayStore/pushNotification', {error: true, msg: 'Problème lors de la supression de l\'image'}, {root:true})
        })
      })
    },
    checkAddMediaPermission({commit}) {
      return new Promise(function(resolve, reject) {
        axios.get(`/images/new`)
        .then(() => { resolve() })
        .catch(() => { reject() })
      })
    },
    setSearchPage({commit}, page) {
      commit('SET_PAGE', page)
    },
    setSearchQuery({commit}, query) {
      commit('SET_QUERY', query)
    },
    toggleFilter({commit, state}, type) {
      let term = (state.activeFilters[type] == 'ASC') ? 'DESC' : 'ASC'
      commit('SET_FILTER', [term, type])
    },
    clearImgListing({ commit }){
      commit('CLEAR_IMG_LISTING')
    },
    updateSrc ({commit, state}, src) {
      commit('UPDATE_CURRENT_IMG_SRC', src)
    },
    addToTagFilter({commit, state}, id) {
      commit('ADD_TO_TAG_FILTERS', id)
    },
    removeFromTagFilter({commit, state}, id) {
      commit('REMOVE_FROM_TAG_FILTERS', id)
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
