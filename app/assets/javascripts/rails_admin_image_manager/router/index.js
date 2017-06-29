import Vue from 'vue'
import Router from 'vue-router'

import imageListing from '../components/imageListing.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: imageListing,
    }
  ]
})

export default router
