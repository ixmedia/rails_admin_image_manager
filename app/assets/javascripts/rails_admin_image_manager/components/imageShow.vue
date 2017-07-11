<template>
  <div class="content content-narrow animated fadeIn">
    <div class="row items-push">
      <div class="col-sm-12">
        <a href="#"><i class="fa fa-arrow-left"></i> Retour à la liste</a>
      </div>
    </div>
    <div class="block">
      <div class="block-header">
        <h3 class="block-title">Modifier l'image</h3>
      </div>
      <div class="block-content">
        <div class="row">

          <div class="col-sm-6">
            <form class="form-horizontal" v-on:submit.prevent="save" method="post">

              <div :class="[{ 'has-error': errors.name },'form-group']">
                <div class="col-sm-12">
                  <div class="form-material">
                    <input v-model="currentImgTitle" class="form-control" type="text" id="image-title" name="material-text" >
                    <label for="image-title">Titre</label>
                    <span class="help-block" v-if="errors.name">{{ errors.name[0] }}</span>
                  </div>
                </div>
              </div>

              <div :class="[{ 'has-error': errors.copyright },'form-group']">
                <div class="col-sm-12">
                  <div class="form-material">
                    <input v-model="currentImgCopyright" class="form-control" type="text" id="image-copyright" name="material-text" >
                    <label for="image-copyright">Copyright</label>
                    <span class="help-block" v-if="errors.copyright">{{ errors.copyright[0] }}</span>
                  </div>
                </div>
              </div>
              <div :class="[{ 'has-error': errors.description },'form-group']">
                <div class="col-sm-12">
                  <div class="form-material">
                    <textarea v-model="currentImgDescription" class="form-control" id="material-textarea-large" name="material-textarea-large" rows="8"></textarea>
                    <label for="material-textarea-large">Description</label>
                    <span class="help-block" v-if="errors.description">{{ errors.description[0] }}</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-12">
                  <image-tag-selector label="Étiquettes"></image-tag-selector>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-10">
                  <button class="btn btn-sm btn-primary" type="submit">Enregistrer</button>
                  <image-insert-button :id="currentImgId"/>
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
import imageTagSelector from './imageTagSelector.vue'

export default {
  components: {imageInsertButton, imageUpload, imageTagSelector},
  data () {
    return {
      currentImgTitle: '',
      currentImgCopyright: '',
      currentImgDescription: '',
      currentImgId: ''
    }
  },
  methods: {
    save() {
      let imgData = {
        name: this.currentImgTitle,
        description: this.currentImgDescription,
        copyright: this.currentImgCopyright,
      }
      this.$store.dispatch('mediasStore/setCurrentImg', imgData)
      this.$store.dispatch('mediasStore/saveCurrentImg')
    },
  },
  computed: {
    ...mapState('mediasStore', ['errors'])
  },
  created () {
    this.currentImgId = this.$store.state.mediasStore.currentImgId
    this.currentImgTitle = this.$store.state.mediasStore.currentImgTitle
    this.currentImgCopyright = this.$store.state.mediasStore.currentImgCopyright
    this.currentImgDescription = this.$store.state.mediasStore.currentImgDescription
  }
}
</script>

<style media="screen">
</style>
