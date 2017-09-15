<template>
  <span class="listing-filter" @click.prevent="filter()">{{label}}
    <i v-if="activeFilters[type] == 'ASC'" class="fa fa-arrow-down"></i>
    <i v-if="activeFilters[type] == 'DESC'" class="fa fa-arrow-up"></i>
  </span>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['label', 'type'],
  data () {
    return {}
  },
  computed: {
    ...mapState('mediasStore', ['activeFilters'])
  },
  methods: {
    filter () {
      this.$store.dispatch('mediasStore/setSearchPage', 1)
      this.$store.dispatch('mediasStore/clearImgListing')
      this.$store.dispatch('mediasStore/toggleFilter', this.type)
      this.$store.dispatch('mediasStore/fetchImage')
    }
  }
}
</script>
<style media="screen" lang="sass">
  .listing-filter
    cursor: pointer
</style>
