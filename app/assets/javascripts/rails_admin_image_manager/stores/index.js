import Vue from 'vue'
import Vuex from 'vuex'

import mediasStore from './medias'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mediasStore: mediasStore,
  }
})
