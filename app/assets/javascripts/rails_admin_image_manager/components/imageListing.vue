<template>
  <div class="content animated fadeIn">
    <div class="block">
      <div class="block-header">
        <search-autocomplete></search-autocomplete>

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
              <router-link class="btn btn-primary" :to="{ name: 'createImage'}"><i class="fa fa-plus"></i> Ajouter une image</router-link>
              <button v-if="searchedQuery || selectedFilter" @click="resetSearchAndFilters" class="btn btn-default" ><i class="fa fa-undo"></i> Annuler la recherche</button>
            </p>

            <p v-if="searchedQuery">Recherche: {{ searchedQuery }}</p>

          </div>
        </div>
        <div class="row items-push" v-if="grid">
          <div class="listing-element" v-for="(image, key) in imageListItems">
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
        <div class="row text-center items-push">
          <div class="col-sm-12">
            <button type="button" v-if="maxImageListItems > imageListItems.length" class="btn btn-default" @click="fetchImage">Plus d'image</button>
          </div>
        </div>
        <div class="row items-push" v-if="!grid">
          <div class="table-responsive">
            <table class="table table-striped table-vcenter">
              <tbody>
                <tr v-for="(image, key) in imageListItems">
                  <td>
                    <img width="100px" :src="image.src" alt="">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import imageInsertButton from './imageInsertButton.vue'
import imageTagSelector from './imageTagSelector.vue'
import searchAutocomplete from './searchAutocomplete.vue'
import Lazyload from '../libs/lazyload.js'
import {mapState} from 'vuex'
export default {
  components: {imageInsertButton, imageTagSelector, searchAutocomplete},
  data () {
    return {
      grid: true,
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
  methods:{
    fetchImage() {
      if (!this.isFetching && (this.maxImageListItems == -1 || this.imageListItems.length < this.maxImageListItems) ) {
        this.isFetching = true
        this.$store.dispatch('mediasStore/setSearchPage', this.page + 1)
        this.$store.dispatch('mediasStore/fetchImage').then(()=> {
          this.isFetching = false
          this.page ++
        })
      }
    },
    filter() {
      console.log('filter');
    },
    search() {
      this.page = 1
      this.searchedQuery = (this.query == '') ? '' : this.query
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/setSearchQuery', this.query)
      this.$store.dispatch('mediasStore/fetchImage')
    },
    resetSearchAndFilters() {
      this.page = 1
      this.query = ''
      this.selectedFilter = ''
      this.searchedQuery = ''
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/setSearchPage', this.page)
      this.$store.dispatch('mediasStore/fetchImage')
    },
    deleteImage(image){
      this.$store.dispatch('overlayStore/pushConfirmation', { msg: 'Voulez vous supprimer l\'image définitivement?', callback: () => {
        this.$store.dispatch('mediasStore/deleteImg', image.id)
      }})
    }
  },
  created() {
    this.$store.dispatch('mediasStore/setSearchPage', this.page)
    this.$store.dispatch('mediasStore/fetchImage')
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

  .listing-element
    margin: 10px
    float: left
    width: 150px

    .btn-sm.btn
      padding: 0 5px
      font-size: 11px
</style>
