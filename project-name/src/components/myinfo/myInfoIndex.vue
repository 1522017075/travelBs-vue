<template>
  <el-container>
    <el-header>
      <div class='homepage'>
        <el-avatar :size="100" :src="myInfo.head" style="margin-top: 50px"></el-avatar>
          <h4>个人简介：{{myInfo.profile}}</h4>
      </div>
    </el-header>
    <el-main>
      <el-container style="margin-top: 200px;padding-left: 100px; border: 0px solid #eee">
        <left-side-menu></left-side-menu>
        <router-view/>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
    import LeftSideMenu from "./LeftSideMenu";
    export default {
        name: "myInfoIndex",
        components: {LeftSideMenu},
        data () {
            return {
              myInfo: []
            }
        },
        methods: {

        },
        mounted: function () {
            var info = window.localStorage.getItem('myInfo')
            this.myInfo = JSON.parse(info)
            console.log(this.myInfo.head)
        }
    }
</script>

<style scoped>
  .homepage{
    height: 240px;
    width: 100%;
    background: -webkit-linear-gradient(top,white,lightblue, #66ccff);
  }
  @keyframes bg {
    0% {background-size: 110% 130%; }
    10% {background-size: 111% 131%; }
    20% {background-size: 112% 132%; background-position: bottom;}
    30% {background-size: 113% 133%; }
    40% {background-size: 114% 134%;}
    50% {background-size: 115% 135%;background-position: left;}
    60% {background-size: 116% 136%;}
    70% {background-size: 117% 137%;}
    80% {background-size: 118% 138%;background-position: top;}
    90% {background-size: 119% 139%;}
    100% {background-size: 120% 140%;}
  }
  .content{
    background: #66ccff;
    display: inline-block;
    position: relative;
    top: 40%;
    margin-top: 200px;
    width: 90%;
  }
  p{
    text-shadow: 0px 0px 10px rgba(255,255,255,0.5);
    letter-spacing: 10px;
  }
</style>
