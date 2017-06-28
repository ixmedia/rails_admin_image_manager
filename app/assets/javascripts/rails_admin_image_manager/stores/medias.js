import Vue from 'vue'
import Vuex from 'vuex'

const mediasStore = {
  namespaced: true,
  state: {
    showOverlay: false,
    srcImgDataUrl: '',
    imgDataUrl: ''
  },
  mutations: {
    SET_SHOW_OVERLAY (state, value) {
      state.showOverlay = value
    },
    SET_IMG_DATA (state, data) {
      state.imgDataUrl = data
    },
    SET_SRC_IMG_DATA (state, data) {
      state.srcImgDataUrl = data
    }
  },
  actions: {
    showOverlay ({commit, state}, value) {
      commit('SET_SHOW_OVERLAY', value)
    },
    saveImgDataUrl ({commit, state}, data) {
      commit('SET_IMG_DATA', data)
    },
    saveSrcImgDataUrl ({commit, state}, data) {
      commit('SET_SRC_IMG_DATA', data)
    }
  }
}

export default mediasStore
