<template>
  <div class="image-upload">
    <div class="image-upload__content">
      <img :src="currentImgSrc" class="image-upload__img" v-if="currentImgSrc" alt="">
      <div class="image-upload__placeholder" v-if="currentImgSrc == ''">
        <i class="fa fa-image"></i>
        Ajouter une image
      </div>
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
  cursor: pointer

.image-upload__content
  position: relative
  border: 6px dashed #fcfcfc
  transition: all 200ms linear

  &:hover
    border-color: #c9c9c9

.image-upload__placeholder
  width: 100%
  padding: 30px 0
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  cursor: pointer
  opacity: 0.8
  i
    font-size: 70px
</style>
