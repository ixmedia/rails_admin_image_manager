<template>
  <transition name="fade">
    <div class="progress-overlay progress active" v-if="showProgress" style="height: 6px">
      <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
    </div>
  </transition>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('overlayStore', ['showProgress'])
  }
}
</script>

<style media="screen" lang='sass'>
.progress-overlay
  position: fixed
  top: 0
  width: 100%

.fade-enter-active, .fade-leave-active
  transition: opacity .150s
.fade-enter, .fade-leave-to
  opacity: 0

.image-insert-overlay__close
  position: absolute
  top: 0
  right: 0
  background-color: transparent
  border: none

</style>
