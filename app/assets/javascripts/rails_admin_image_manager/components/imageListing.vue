<template>
  <div class="content animated fadeIn">
    <div class="block">
      <div class="block-header">
        <ul class="nav-header pull-left">
          <li>
            <form class="form-horizontal" @submit.prevent="search" method="post" style="width: 450px">
              <div class="form-material form-material-primary input-group remove-margin-t remove-margin-b">
                <input class="form-control" v-model="query" type="text"  placeholder="Rechercher..">
                <span @click="search" class="input-group-addon"><i class="si si-magnifier"></i></span>
              </div>
            </form>
          </li>
        </ul>
        <ul class="nav-header pull-right">
          <li>
            <select v-model="selectedFilter" @change="filter">
              <option value="">Filtre</option>
              <option :value="tag.id" v-for="tag in tags">{{ tag.name }}</option>
            </select>
          </li>
        </ul>
      </div>
      <div class="block-content">

        <div class="row">
          <div class="col-sm-6">
            <p>
              <router-link class="btn btn-primary" :to="{ name: 'createImage'}">
              <i class="fa fa-plus"></i> Ajouter une image
            </router-link>
            </p>

            <p v-if="searchedQuery ">Recherche: {{ searchedQuery }}</p>

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
                  <a class="btn btn-sm btn-default" @click="deleteImage(image)" href="javascript:void(0)">Supprimer</a>
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
import Lazyload from '../libs/lazyload.js'
import {mapState} from 'vuex'
export default {
  components: {imageInsertButton},
  data () {
    return {
      images: [0, 1, 3, 4, 5, 6, 7, 8, 9],
      lazyload: new Lazyload(()=> {
        this.fetchImage()
      }),
      page: 1,
      isFetching: false,
      query: '',
      searchedQuery: '',
      selectedFilter: ''
    }
  },
  computed: {
    ...mapState('mediasStore', ['imageListItems', 'maxImageListItems', 'tags'])
  },
  created() {
    this.$store.dispatch('mediasStore/fetchImageWithParams', {page: this.page})
  },
  methods:{
    fetchImage() {
      if (!this.isFetching && (this.maxImageListItems == -1 || this.imageListItems.length < this.maxImageListItems) ) {
        this.isFetching = true
        this.$store.dispatch('mediasStore/fetchImageWithParams', {page: this.page + 1}).then(()=> {
          this.isFetching = false
          this.page ++
        })
      }
    },
    search() {
      this.page = 1
      this.searchedQuery = (this.query == '') ? '' : this.query
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/fetchImageWithParams', { search: this.query })
    },
    filter() {
      this.page = 1;
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/fetchImageWithParams', { tags: this.selectedFilter })
    },
    deleteImage(image){
      this.$store.dispatch('overlayStore/pushConfirmation', { msg: 'Voulez vous supprimer l\'image définitivement?', callback: () => {
        this.$store.dispatch('mediasStore/deleteImg', image.id)
      }})
    }
  },
  mounted() {
    this.lazyload.start()
    this.$store.dispatch('mediasStore/fetchTags')
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
