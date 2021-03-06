import mediasStore from './medias'
import overlayStore from './overlay'
import ckEditorStore from './ckeditor'
import railsAdmin from './railsAdmin'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    mediasStore: mediasStore,
    overlayStore: overlayStore,
    ckEditorStore: ckEditorStore,
    railsAdmin: railsAdmin
  }
})
