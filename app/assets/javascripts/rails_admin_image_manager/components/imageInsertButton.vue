<template>
  <button typ="button" class="btn btn-sm btn-default" @click.prevent="insert()">Utiliser l'image</button>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['id'],
  data () {
    return {}
  },
  methods: {
    insert () {
      if (this.id) {
        this.$store.dispatch('mediasStore/fetchSingleImage', this.id).then(()=> {
          this.$store.dispatch('overlayStore/showInsertOverlay', true)
        })
      } else {
        this.$store.dispatch('overlayStore/showInsertOverlay', true)
      }
    }
  }
}
</script>

<style media="screen">
</style>
