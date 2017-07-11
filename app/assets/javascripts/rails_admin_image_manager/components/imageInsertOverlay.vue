<template>
  <transition name="fade">
    <div class="image-insert-overlay form-horizontal block" v-if="showInsertOverlay">
      <button @click="close" class="image-insert-overlay__close" type="button"><i class="fa fa-times"></i></button>
      <div class="block-content">
        <p><img :src="currentImgSrc" style="width: 100%;" alt=""></p>
        <div class="form-group">
          <div class="col-sm-6">
            <div class="form-material">
              <input class="form-control" type="number" v-model="imgWidth" @keyup="keepRatio('width')">
              <label for="material-text">Largeur</label>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-material">
              <input class="form-control" type="number" v-model="imgHeight" @keyup="keepRatio('height')">
              <label for="material-textarea-large">Hauteur</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-12">
            <button type="button" class="btn btn-primary" @click="insert()">Insérer</button>
            <button type="button" class="btn btn-default" @click="close()">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      imgWidth: 800,
      imgHeight: 600,
      ratio: 800/600
    }
  },
  computed: {
    ...mapState('overlayStore', ['showInsertOverlay']),
    ...mapState('mediasStore', ['currentImgSrc'])
  },
  methods: {
    insert () {
      this.$store.dispatch('mediasStore/useImage', [this.imgWidth, this.imgHeight])
      this.$store.dispatch('overlayStore/showInsertOverlay', false)
    },
    close() {
      this.$store.dispatch('overlayStore/showInsertOverlay', false)
    },
    keepRatio(e) {
      if (e == 'width') {
        this.imgHeight = parseInt(this.imgWidth / this.ratio)
      } else {
        this.imgWidth = parseInt(this.imgHeight * this.ratio)
      }
    }
  }
}
</script>

<style media="screen">
.image-insert-overlay {
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  max-width: 640px;
  z-index: 20;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.image-insert-overlay__close {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
}
</style>
