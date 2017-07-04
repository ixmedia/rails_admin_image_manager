<template>
  <div class="image-upload">
    <img :src="currentImgSrc" class="image-upload__img" v-if="currentImgSrc" alt="">
    <input class="image-upload__file-input" type="file" @change="encode($event)">
  </div>
</template>

<script>
import { encodeImageFileAsURL } from '../libs/helpers.js'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('mediasStore', ['currentImgSrc'])
  },
  created () {
    console.log('created', this.currentImg);
  },
  methods: {
    encode(e) {
      encodeImageFileAsURL(e.target)
      .then((src) => {
        this.$store.dispatch('mediasStore/updateSrc', src)
      })
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
</style>
