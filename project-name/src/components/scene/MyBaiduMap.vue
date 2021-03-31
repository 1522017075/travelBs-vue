<template>
  <baidu-map class="map" center="晋祠公园">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-walking start="" end="" :auto-viewport="true" location=""></bm-walking>
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
