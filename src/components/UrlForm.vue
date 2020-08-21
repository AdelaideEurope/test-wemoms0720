<template>
  <div id="url-form">
    <input type="text" placeholder="URL" v-model="url" >
    <input type="text" placeholder="Titre" v-model="title" >
    <input type="submit" value="Ajouter" id="btn-add-link" @click= "addNewLink(url, title)" >

  </div>
</template>
<script>
  import { store } from '../store.js'
  export default {
    name: 'UrlForm',
    data () {
      return {
        sharedState: store.state.json.campaign,
        url: '',
        title: ''
      }
    },
    methods: {
      addNewLink(url, title) {
        this.sharedState.campaign_impact_insight_urls.push({"name": title, "url": url})
        this.url = ''
        this.title = ''
      },
    }
  }
</script>
<style scoped>
  #url-form {
    display: flex;
    justify-content: space-between;
    width: 41%;
  }
</style>
