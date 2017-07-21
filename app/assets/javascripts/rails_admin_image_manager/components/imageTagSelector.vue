<template>
  <div class="image-tag-selector form-material">
    <div class="image-tag-selector__choices">
      <p><span class="label label-primary" @click="removeSelected(tag)" v-for="tag in currentImgTags">{{tag}}</span></p>
    </div>
    <input type="text" placeholder="Saisir une étiquette et faire enter" class="form-control" v-model="searchText" @keyup="addCusttom">
    <label for="example-select2-multiple">{{label}}</label>
    <ul class="image-tag-selector__pool-list">
      <li v-for="tag in filteredTags" @click="selectTag(tag)"><button type="button">{{ tag }}</button></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['label'],
  data () {
    return {
      searchText: '',
      tagsPool: []
    }
  },
  computed: {
    filteredTags() {
      let filtreTexte = (string) => {
        if (string == '') return []
        return this.tagsPool.filter((el) =>
          el.toLowerCase().indexOf(string.toLowerCase()) > -1
        );
      }
      return filtreTexte(this.searchText)
    },
    ...mapState('mediasStore', ['currentImgTags', 'tags'])
  },
  methods: {
    selectTag(string) {
      if (this.currentImgTags.indexOf(string) < 0) {
        this.$store.dispatch('mediasStore/addTag', string)
        this.searchText = ''
      }
    },
    removeSelected(string) {
      this.$store.dispatch('mediasStore/removeTag', string)
    },
    addCusttom(e) {
      if (e.keyCode == 13 && this.tagsPool.indexOf(this.searchText) < 0 && this.currentImgTags.indexOf(this.searchText) < 0) {
        this.$store.dispatch('mediasStore/addTag', this.searchText)
        this.searchText = ''
      }
    }
  },
  mounted () {
    this.$store.dispatch('mediasStore/fetchTags').then(()=> {
      for (var i = 0; i < this.tags.length; i++) {
        let tag = this.tags[i]
        this.tagsPool.push(tag.name)
      }
    })
  }
}
</script>

<style media="screen" lang="sass">

.image-tag-selector__pool-list
  list-style: none
  margin: 0
  padding: 0
  position: absolute
  top: 100%
  width: 100%
  z-index: 100

  li
    background-color: #fcfcfc

  button
    background-color: transparent
    border: none
    display: block
    width: 100%
    text-align: left
    padding-top: 10px
    padding-bottom: 10px



.image-tag-selector__choices
  .label
    margin: 0 3px
    cursor: pointer
</style>
