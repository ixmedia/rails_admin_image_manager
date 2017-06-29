import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import router from './router'

import store from './stores'

document.addEventListener("DOMContentLoaded", function() {
  let csrfElement = document.querySelectorAll('meta[name="csrf-token"]')[0]
  axios.defaults.headers.common['X-CSRF-Token'] = csrfElement.getAttribute('content')

  Vue.use(vueAxios, axios)
  Vue.config.productionTip = false
  const imageManager = new Vue({
    el: '#vue-image-manager',
    store: store,
    router
  })
});
