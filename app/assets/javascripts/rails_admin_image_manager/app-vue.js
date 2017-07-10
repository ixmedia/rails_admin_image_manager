import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import router from './router'

import {mapState} from 'vuex'
import store from './stores'

import imageInsertOverlay from './components/imageInsertOverlay.vue'
import progressOverlay from './components/progressOverlay.vue'
import notificationOverlay from './components/notificationOverlay.vue'

document.addEventListener("DOMContentLoaded", function() {

  let csrfElement = document.querySelectorAll('meta[name="csrf-token"]')[0]
  axios.defaults.headers.common['X-CSRF-Token'] = csrfElement.getAttribute('content')
  let appElement = document.getElementById('vue-image-manager')

  axios.defaults.baseURL = AJAX_ENDPOINT

  Vue.use(vueAxios, axios)
  Vue.config.productionTip = false
  const imageManager = new Vue({
    el: '#vue-image-manager',
    components: {imageInsertOverlay, progressOverlay, notificationOverlay},
    store: store,
    router,
    computed: {
      ...mapState('overlayStore', ['showProgress'])
    },
    mounted: function () {
      // Checking if we are from CKEDITOR
      if (this.$el.attributes['ck-fn'] !== undefined && this.$el.attributes['ck-id'] !== undefined) {
        this.$store.dispatch('ckEditorStore/setCkId', this.$el.attributes['ck-fn'].value)
        this.$store.dispatch('ckEditorStore/setCkFun', this.$el.attributes['ck-id'].value)
      }
      // Opening inser overlay if we have selectImage in queryString
      if (this.$el.attributes['ck-selected-image-id'] !== undefined) {
        this.$store.dispatch('mediasStore/fetchSingleImage', this.$el.attributes['ck-selected-image-id'].value).then(()=> {
          this.$store.dispatch('overlayStore/showInsertOverlay', true)
        })
      }
    }
  })
});
