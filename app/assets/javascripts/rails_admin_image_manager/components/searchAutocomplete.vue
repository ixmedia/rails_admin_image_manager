<template>
  <div class="search-autocomplete">
    <input @keyup.prevent="fuzzySearch" class="form-control" v-model="query" type="text"  placeholder="Rechercher..">
    <span class="search-autocomplete__selected-tag" v-for="activeTag in activeFilters.tags">{{getTagFromId(activeTag)}}</span>
    <div class="search-autocomplete__tags-list">
      <span :class="[{'active': isActive(index)}, 'search-autocomplete__tag']" v-for="(tag,index) in filteredTags">{{tag.name}}</span>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
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
        this.$store.dispatch('mediasStore/clearImgListing')
        this.$store.dispatch('mediasStore/fetchImage')
      }

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
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/addToTagFilter', this.filteredTags[this.selectedTagIndex].id)
      this.$store.dispatch('mediasStore/fetchImage')
      this.selectedTagIndex = -1
      this.query = ""
    },
    isActive(index) {
      return index == this.selectedTagIndex;
    },
    getTagFromId(id) {
      let myTag = _.find(this.tags,(tag) => {return tag.id == id})
      console.log(myTag);
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
    padding: 5px 10px
    background-color: #5c90d2
    color: white
    border-radius: 10px

  .search-autocomplete
    width: 100%
    position: relative

  .search-autocomplete__tags-list
    position: absolute
    top: 100%
    width: 100%
    z-index: 100
    background-color: white
  .search-autocomplete__tag
    display: block
    padding: 5px

    &.active
      background-color: red
      color: white
</style>
