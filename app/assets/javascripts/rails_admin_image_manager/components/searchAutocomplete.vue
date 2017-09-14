<template>
  <div class="search-autocomplete">
    <div class="search-autocomplete__input">
      <input @keyup.prevent="fuzzySearch" class="form-control" v-model="query" type="text"  placeholder="Rechercher par titre ou étiquette ...">
      <div class="search-autocomplete__tags-list">
        <span @click="selectedTagIndex = index; selectTag()" :class="[{'active': isActive(index)}, 'search-autocomplete__tag']" v-for="(tag,index) in filteredTags">{{tag.name}}</span>
      </div>
    </div>
    <span @click="deselectTag(activeTag)" class="label label-primary search-autocomplete__selected-tag" v-for="activeTag in activeFilters.tags">{{getTagFromId(activeTag)}}</span>
  </div>

</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Fuse from '../vendors/fuse.min.js'
export default {
  data () {
    return {
      query: '',
      fuseSearch: null,
      selectedTagIndex: -1
    }
  },
  computed: {
    ...mapState('mediasStore', ['tags', 'activeFilters']),
    // Autocomplet will search for last string in input (seperated by space)
    searchFor() {
      let lastElem = this.query.split(' ').reverse()[0]
      return lastElem
    },
    filteredTags() {
      if (this.fuseSearch) {
        return this.fuseSearch.search(this.searchFor);
      }else {
        return []
      }

    }
  },
  methods:{
    fuzzySearch(e) {
      if(e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        this.navigatesTags(e.key)
      } else if (e.key == 'Enter' && this.selectedTagIndex >= 0) {
        this.selectTag()
      } else if (e.key == 'Enter') {
        this.$store.dispatch('mediasStore/setSearchQuery', this.query)
        this.$store.dispatch('mediasStore/clearImgListing')
        this.$store.dispatch('mediasStore/fetchImage')
      } else if((e.key == 'Backspace' || e.key == 'Meta') && this.query == '' && this.activeFilters.search != '') {
        this.clearSearch()
      }
    },
    clearSearch() {
      this.$store.dispatch('mediasStore/setSearchQuery', '')
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/fetchImage')
    },
    navigatesTags(key) {
      if (key == 'ArrowUp') {
        (this.selectedTagIndex > 0) ? this.selectedTagIndex -- : 0
      } else {
        (this.selectedTagIndex < this.filteredTags.length - 1) ? this.selectedTagIndex ++ : this.filteredTags.length
      }
    },
    selectTag() {
      let query = this.query
      let queryArray = query.split(' ').reverse()
      queryArray[0] = this.filteredTags[this.selectedTagIndex].name
      let newQuery = queryArray.reverse().join(' ')
      this.$store.dispatch('mediasStore/setSearchQuery', '')
      this.$store.dispatch('mediasStore/setSearchPage', 1)
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/addToTagFilter', this.filteredTags[this.selectedTagIndex].id)
      this.$store.dispatch('mediasStore/fetchImage')
      this.selectedTagIndex = -1
      this.query = ""
    },
    deselectTag(id){
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/removeFromTagFilter', id)
      this.$store.dispatch('mediasStore/fetchImage')
    },
    isActive(index) {
      return index == this.selectedTagIndex;
    },
    getTagFromId(id) {
      let myTag = _.find(this.tags,(tag) => {return tag.id == id})
      return myTag.name
    }

  },
  mounted() {
    this.$store.dispatch('mediasStore/fetchTags').then(() => {
      this.fuseSearch = new Fuse(this.tags, {keys: ['name']})
    })
  }
}
</script>

<style media="screen" lang="sass">
  .search-autocomplete__selected-tag
    display: inline-flex
    margin: 3px
    position: relative
    cursor: pointer
    &:first-of-type
      margin-left: 0

  .search-autocomplete__input
    position: relative

  .search-autocomplete
    width: 100%
    position: relative

  .search-autocomplete__tags-list
    position: absolute
    top: 100%
    width: 100%
    z-index: 100
    background-color: white
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1)

  .search-autocomplete__tag
    display: block
    padding: 5px
    transition: all 200ms linear
    cursor: pointer
    &:hover
      background-color: #ededed

    &.active
      background-color: #5c90d2
      color: white
</style>
