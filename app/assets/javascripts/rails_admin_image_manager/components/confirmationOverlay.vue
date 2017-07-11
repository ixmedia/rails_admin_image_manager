<template>
  <transition name="fade">
    <div v-if="confirmation.msg" class="confirmation-overlay">
      <div class="confirmation-overlay__box block">
        <div class="block-header">
          <ul class="block-options">
            <li><button type="button" @click="close"><i class="fa fa-times"></i></button></li>
          </ul>
          <h2 class="block-title">Confirmation</h2>
        </div>
        <div class="block-content">
          <div class="row items-push">
            <div class="col-sm-12">
              <p>{{ confirmation.msg }}</p>
              <div class="btn-group">
                <button type="button" @click="close" class="btn btn-default" name="button">Annuler</button>
                <button type="button" @click="callCallback" class="btn btn-danger" name="button">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('overlayStore', ['confirmation'])
  },
  methods: {
    close() {
      this.$store.dispatch('overlayStore/clearConfirmation')
    },
    callCallback() {
      this.confirmation.callback()
      this.close()
    }
  }
}
</script>

<style media="screen" lang='sass'>
.confirmation-overlay::after
  position: fixed
  content: ""
  display: block
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(255, 255, 255, 0.5)
  z-index: 10

.confirmation-overlay__box
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.5)
  position: fixed
  background-color: white
  top: 50%
  left: 50%
  transform: translate(-50%,-50%)
  width: 100%
  max-width: 640px
  z-index: 20

</style>
