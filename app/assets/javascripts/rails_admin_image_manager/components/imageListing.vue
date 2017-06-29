<template>
  <div class="image-listing">
    <div v-for="(image, key) in images" class="block" style="background-image: url('http://via.placeholder.com/350x150')">
      <div class="block-header">
        <ul class="block-options">
          <li>
            <button type="button"><i class="si si-settings"></i></button>
          </li>
        </ul>
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
  .image-listing {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: center;*/
    /*margin-left: -10px;*/
    /*margin-right: -10px;*/
  }

  .image-listing .block {
    width: 175px;
    height: 175px;
    margin: 10px;
    background-size: cover;
    background-position: center center;
  }
</style>
