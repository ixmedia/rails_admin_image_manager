<template>
  <button typ="button" class="btn btn-xs btn-default" @click.prevent="insert()">Utiliser</button>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['id', 'saveMethod'],
  data () {
    return {}
  },
  methods: {
    insert () {
      let doIt = (response) => {
        let id = this.id || response.data.id
        if (this.$store.state.ckEditorStore.ckId != "") {
          if (id) {
            this.$store.dispatch('mediasStore/fetchSingleImage', this.id).then(()=> {
              this.$store.dispatch('overlayStore/showInsertOverlay', true)
            })
          } else {
            this.$store.dispatch('overlayStore/showInsertOverlay', true)
          }
        } else {
          this.$store.dispatch('railsAdmin/insertImage', id)
        }
      }
      if (typeof this.saveMethod == "function") {
        this.saveMethod().then(doIt).catch(() => { console.log('Erreur lors de la sauvegarde');})
      } else {
        doIt()
      }

    }
  }
}
</script>

<style media="screen">
</style>
