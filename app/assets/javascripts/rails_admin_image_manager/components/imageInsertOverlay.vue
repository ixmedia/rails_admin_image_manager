<template>
  <transition name="fade">
    <div class="image-insert-overlay form-horizontal" v-if="showInsertOverlay">
      <div class="block">
        <div class="block-content">
          <p><img src="https://unsplash.it/680/480" style="width: 100%;" alt=""></p>
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
              <button type="button" @click="insert()">Insérer</button>
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
  data () {
    return {
      imgWidth: 800,
      imgHeight: 600,
      ratio: 800/600
    }
  },
  computed: {
    ...mapState('overlayStore', ['showInsertOverlay']),
    ...mapState('mediasStore', ['currentImg'])
  },
  methods: {
    insert () {
      this.$store.dispatch('mediasStore/useImage', [this.width, this.height])
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
  position: absolute;
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
</style>
