<template>
  <div class="content content-narrow">
    <div class="block">
      <div class="block-header">
        <h3 class="block-title">Modifier l'image</h3>
      </div>
      <div class="block-content">
        <div class="row">

          <div class="col-sm-6">
            <form class="form-horizontal" action="#" method="post">
              <div class="form-group">
                <div class="col-sm-12">
                  <div class="form-material">
                    <input class="form-control" type="text" id="material-text" name="material-text" >
                    <label for="material-text">Nom de l'image</label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-12">
                  <div class="form-material">
                    <input class="form-control" type="text" id="material-text" name="material-text" >
                    <label for="material-text">Copyright</label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <div class="form-material">
                    <textarea class="form-control" id="material-textarea-large" name="material-textarea-large" rows="8"></textarea>
                    <label for="material-textarea-large">Description</label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-10">
                  <button class="btn btn-sm btn-primary" type="button">Enregistrer</button>
                  <image-insert-button/>
                </div>
              </div>
            </form>
          </div>
          <div class="col-sm-6">
            <p>
              <img src="https://unsplash.it/680/480" style="width: 100%;" alt="">
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageInsertButton from './imageInsertButton.vue'
export default {
  components: {imageInsertButton},
  data () {
    return {
      images: [0, 1, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    save() {

    },
    useImage() {
      // #TODO
      // * Call ajax qui retourne le vrai path généré de l'images
    }
  }
}
</script>

<style media="screen">
</style>
