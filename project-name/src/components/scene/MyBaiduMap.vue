<template>
  <baidu-map class="map" center="晋祠公园">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-walking start="晋祠" end="圣母殿" :auto-viewport="true" location="北京"></bm-walking>
  </baidu-map>
</template>

<script>
    export default {
        name: "MyBaiduMap"

    }
</script>

<style scoped>
  .map {
    width: 100%;
    height: 400px;
  }
</style>
