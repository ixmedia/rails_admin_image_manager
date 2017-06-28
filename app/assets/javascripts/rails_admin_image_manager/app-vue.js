import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import {mapState} from 'vuex'

import store from './stores'

axios.defaults.headers.common['X-CSRF-Token'] = $('meta[name="csrf-token"]').attr('content')

export default (() => {

  if (!document.getElementById('vue-app')) {
    return false
  }

  Vue.use(vueAxios, axios)

  const enio = new Vue({
    el: '#vue-app',
    store: store,
  })

})()
