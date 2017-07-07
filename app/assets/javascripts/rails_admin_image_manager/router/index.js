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
        store.dispatch('overlayStore/showProgressOverlay', true)
        store.dispatch('mediasStore/fetchSingleImage', to.params.id)
        .then(() => {
          store.dispatch('overlayStore/showProgressOverlay', false)
          next()
        })
        .catch((e) => { console.log(e); store.dispatch('overlayStore/showProgressOverlay', false); })
      }
    },
    {
      path: '/new/',
      name: 'createImage',
      component: imageShow,
      beforeEnter: (to, from, next) => {
        store.dispatch('mediasStore/clearCurrentImg')
        next()
      }
    }
  ]
})

export default router
