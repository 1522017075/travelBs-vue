<template>
  <body id="poster">
  <div class="btnGroup">
    <div class="pic1">
    </div>
    <div class="pic2">
    </div>
    <div class="pic3">
    </div>
  </div>
  </body>
</template>

<script>
    export default {
        name: "Appindex.vue"
    }
</script>

<style scoped>
  #poster {
    background: url("../../assets/jinci.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  .btnGroup{
    padding-top: 14%;
  }

  .pic1{
    background: url("../../assets/img/icon/button1.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 30%;
    display: inline-block;
    float: left;
    height: 121px;
    width: 236px;
  }
  .pic2{
    background: url("../../assets/img/icon/button2.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 60px;
    display: block;
    display: inline-block;
    float: left;
    height: 121px;
    width: 236px;
  }
  .pic3{
    background: url("../../assets/img/icon/button3.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 60px;
    display: block;
    display: inline-block;
    float: left;
    height: 121px;
    width: 236px;
  }

  body {
    margin: 0px;
  }
</style>
