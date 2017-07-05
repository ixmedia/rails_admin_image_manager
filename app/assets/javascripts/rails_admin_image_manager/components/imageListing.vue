<template>
  <div class="content animated fadeIn">
    <div class="block">
      <div class="block-header">
        <form class="form-horizontal" action="base_pages_search.php" method="post">
          <div class="form-material form-material-primary input-group remove-margin-t remove-margin-b">
            <input class="form-control" type="text" id="base-material-text" name="base-material-text" placeholder="Search..">
            <span class="input-group-addon"><i class="si si-magnifier"></i></span>
          </div>
        </form>
      </div>
      <div class="block-content">

        <div class="row items-push">
          <div class="image-element col-lg-2 col-md-3 col-sm-4" v-for="(image, key) in images">
            <div class="img-container">
              <img class="img-responsive" src="https://unsplash.it/640/480" alt="">
              <div class="img-options">
                <div class="img-options-content">
                  <h4 class="h6 font-w400 text-white-op push-15">Image name</h4>
                  <router-link class="btn btn-sm btn-default" :to="{ name: 'showImage', params: { id: 123 }}">Modifier</router-link>
                  <image-insert-button id="12"/>
                  <a class="btn btn-sm btn-default" href="javascript:void(0)">Supprimer</a>
                </div>
              </div>
            </div>
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
  }
}
</script>

<style media="screen">
  .image-element {
    margin-bottom: 15px
  }
  .img-options-content .btn {
    margin: 4px
  }
</style>
