<template>
  <div id="url-link">
    <div><a :href="urllink.url" target="_blank"><i class="fas fa-chevron-circle-right"></i> {{ urllink.name }}</a></div>
  </div>
</template>
<script>
export default {
  name: 'UrlLink',
  props: ['urllink']
}
</script>
<style>

</style>
