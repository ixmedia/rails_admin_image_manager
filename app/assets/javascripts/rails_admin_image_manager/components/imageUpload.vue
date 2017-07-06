<template>
  <div class="image-upload">
    <div class="image-upload__content">
      <img :src="currentImgSrc" class="image-upload__img" v-if="currentImgSrc" alt="">
      <input class="image-upload__file-input" type="file" @change="encode($event)">
    </div>
    <button type="button" class="btn btn-default push-20-t" v-if="showOriginal" @click="undo" alt=""><i class="fa fa-undo"></i> Annuler</button>
  </div>
</template>

<script>
import { encodeImageFileAsURL } from '../libs/helpers.js'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      originalSrc: '',
      showOriginal: false
    }
  },
  computed: {
    ...mapState('mediasStore', ['currentImgSrc'])
  },
  created () {
    this.originalSrc = this.currentImgSrc
  },
  methods: {
    encode(e) {
      encodeImageFileAsURL(e.target)
      .then((src) => {
        this.showOriginal = true
        this.$store.dispatch('mediasStore/updateSrc', src)
      })
    },
    undo() {
      this.$store.dispatch('mediasStore/updateSrc', this.originalSrc)
      this.showOriginal = false
    }
  }
}
</script>

<style media="screen" lang="sass">
.image-upload
  position: relative

.image-upload__img
  width: 100%

.image-upload__file-input
  position: absolute
  top: 0
  left: 0
  bottom: 0
  right: 0
  width: 100%
  opacity: 0

.image-upload__content
  position: relative
</style>
