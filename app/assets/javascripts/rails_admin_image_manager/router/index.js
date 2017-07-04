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
    },
    {
      path: '/show/:id',
      name: 'showImage',
      component: imageShow,
      beforeEnter: (to, from, next) => {
        // #TODO AJAX CALL TO GET IMG INFO
        let img = {
          title: "Un titre image",
          copyright: "Un copyright",
          description: "Une description d'image",
          src: "https://unsplash.it/680/480",
          tags: ["foo", "bar", "Bobby"]
        }
        store.dispatch('mediasStore/setCurrentImg', img)
        next()
        // peopleStore.dispatch('retrievePeoples').then(next)
      }
    },
  ]
})

export default router
