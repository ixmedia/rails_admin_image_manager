<template>
  <transition name="fade">
    <div v-if="confirmation.msg" class="confirmation-overlay">
      <div class="confirmation-overlay__box">
        <p>Contenu de la box</p>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('overlayStore', ['confirmation'])
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
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 10

.confirmation-overlay__box
  max-width: 500px
  width: 100%
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background-color: white
  z-index: 15

</style>
