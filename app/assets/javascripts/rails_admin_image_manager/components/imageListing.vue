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

        <div class="row">
          <div class="col-sm-6">
            <p>
              <router-link class="btn btn-primary" :to="{ name: 'createImage'}">
              <i class="fa fa-plus"></i> Ajouter une image
            </router-link>
            </p>
          </div>
        </div>
        <div class="row items-push">
          <div class="image-element col-lg-2 col-md-3 col-sm-4 col-xs-6" v-for="(image, key) in imageListItems">
            <div class="img-container">
              <img class="img-responsive" :src="image.src" alt="">
              <div class="img-options">
                <div class="img-options-content">
                  <h4 class="h6 font-w400 text-white-op push-15">{{ image.name }}</h4>
                  <router-link class="btn btn-sm btn-default" :to="{ name: 'showImage', params: { id: image.id }}">Modifier</router-link>
                  <image-insert-button :id="image.id"/>
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
import {mapState} from 'vuex'
export default {
  components: {imageInsertButton},
  data () {
    return {
      images: [0, 1, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  computed: {
    ...mapState('mediasStore', ['imageListItems'])
  },
  created() {
    this.$store.dispatch('mediasStore/fetchImageForPage', 1)
  }
}
</script>

<style media="screen" lang="sass">
  .add-image-link
    margin-bottom: 15px

  .img-options-content .btn
    margin: 4px

  .add-image-link
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    font-size: 50px
    // width: 250px
    // height: 250px
</style>
