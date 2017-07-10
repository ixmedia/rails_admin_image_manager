<template>
    <div class="notif-overlay">
      <transition-group name="fade-top">
        <div :class="[{'alert-success': notification.success, 'alert-danger': notification.error}, 'alert', 'notification-item']" :key="notification" v-for="notification in notifications">
          <p>{{ notification.msg }}</p>
        </div>
      </transition-group>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState('overlayStore', ['notifications'])
  }
}
</script>

<style media="screen" lang='sass'>
.notif-overlay
  position: fixed
  bottom: 20px
  right: 20px

.notification-item
  width: 300px
  height: 100px
  margin: 5px

  &.error
    background-color: red
    color: white
  &.success
    background-color: #c3f0cc
    color: #3daa41


.fade-top-enter-active, .fade-top-leave-active
  transition: all 400ms

.fade-top-enter, .fade-top-leave-to
  opacity: 0


</style>
