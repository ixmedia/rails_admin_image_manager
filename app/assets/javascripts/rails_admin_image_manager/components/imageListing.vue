<template>
  <div class="content">
    <div class="block">
      <div class="block-content">

        <div class="row items-push">
          <div class="image-element col-lg-2 col-md-3 col-sm-4 animated fadeIn" v-for="(image, key) in images">
            <div class="img-container">
              <img class="img-responsive" src="https://unsplash.it/640/480" alt="">
              <div class="img-options">
                <div class="img-options-content">
                  <h4 class="h6 font-w400 text-white-op push-15">Image name</h4>
                  <router-link class="btn btn-sm btn-default" :to="{ name: 'showImage', params: { id: 123 }}">Modifier</router-link>
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
export default {
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
</style>
