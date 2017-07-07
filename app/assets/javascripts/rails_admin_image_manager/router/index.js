import Vue from 'vue'
import Router from 'vue-router'

import imageListing from '../components/imageListing.vue'
import imageShow from '../components/imageShow.vue'

import store from '../stores'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: imageListing,
      beforeEnter: (to, from, next) => {
        store.dispatch('mediasStore/clearImgListing')
        next()
      }
    },
    {
      path: '/show/:id',
      name: 'showImage',
      component: imageShow,
      beforeEnter: (to, from, next) => {
        store.dispatch('mediasStore/fetchSingleImage', to.params.id)
        .then(next)
        .catch((e) => { console.log(e) })
      }
    },
    {
      path: '/new/',
      name: 'createImage',
      component: imageShow,
      beforeEnter: (to, from, next) => {
        console.log('before');
        store.dispatch('mediasStore/clearCurrentImg')
        next()
      }
    }
  ]
})

export default router
