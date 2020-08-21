<template>
  <div id="url-list">
    <div><b>Suivi de l'impact</b></div>
    <div class="impact-links">
    <UrlLink v-for="urllink in sharedState.campaign_impact_insight_urls"
        :key="urllink.uuid"
        :urllink="urllink" />
    </div>
  </div>

</template>
<script>
import { store } from '../store.js'
import UrlLink from './UrlLink.vue';

export default {
  name: 'UrlList',
  data () {
    return {
      sharedState: store.state.json.campaign,
    }
  },
  components: {
    UrlLink
  }

}
</script>
<style>

</style>
