<template>
  <div class="content content-narrow">
    <div class="block">
      <div class="block-header">
        <h3 class="block-title">Modifier l'image</h3>
      </div>
      <div class="block-content">
        <div class="row">

          <div class="col-sm-6">
            <form class="form-horizontal" v-on:submit.prevent="save" method="post">
              <div class="form-group">
                <div class="col-sm-12">
                  <div class="form-material">
                    <input v-model="currentImgTitle" class="form-control" type="text" id="material-text" name="material-text" >
                    <label for="material-text">Titre</label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-12">
                  <div class="form-material">
                    <input v-model="currentImgCopyright" class="form-control" type="text" id="material-text" name="material-text" >
                    <label for="material-text">Copyright</label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <div class="form-material">
                    <textarea v-model="currentImgDescription" class="form-control" id="material-textarea-large" name="material-textarea-large" rows="8"></textarea>
                    <label for="material-textarea-large">Description</label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-10">
                  <button class="btn btn-sm btn-primary" type="submit">Enregistrer</button>
                  <image-insert-button/>
                </div>
              </div>
            </form>
          </div>
          <div class="col-sm-6">
            <p><image-upload></image-upload></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import imageInsertButton from './imageInsertButton.vue'
import imageUpload from './imageUpload.vue'

export default {
  components: {imageInsertButton, imageUpload},
  data () {
    return {
      currentImgTitle: '',
      currentImgCopyright: '',
      currentImgDescription: ''
    }
  },
  methods: {
    save() {
      let imgData = {
        title: this.currentImgTitle,
        description: this.currentImgDescription,
        copyright: this.currentImgCopyright,
      }
      this.$store.dispatch('mediasStore/setCurrentImg', imgData)
    },
  },
  created () {
    this.currentImgTitle = this.$store.state.mediasStore.currentImgTitle
    this.currentImgCopyright = this.$store.state.mediasStore.currentImgCopyright
    this.currentImgDescription = this.$store.state.mediasStore.currentImgDescription
  }
}
</script>

<style media="screen">
</style>
