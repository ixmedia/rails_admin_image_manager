<template>
  <button typ="button" class="btn btn-sm btn-default" @click.prevent="insert()">Insérer l'image</button>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    insert () {
      this.$store.dispatch('overlayStore/showInsertOverlay', true)
    }
  }
}
</script>

<style media="screen">
</style>
