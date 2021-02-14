<template>
  <div>
    <div style="display: inline-block; min-width: 90%">
      <el-divider></el-divider>
      <el-page-header @back="goBack" content="景点详情"/>
      <div style="float: left; height: 300px;margin-left: 80px">
        <el-image
          style="width: 400px; height: 300px"
          :src="scene.cover"
          fit="contain"/>
      </div>
      <div style="float: left; height: 60px;clear:right;margin-left: 80px">
        <span style="font-size: 40px">{{scene.name}}</span><br>
        <span style="font-size: 20px">{{scene.author}}({{scene.date}})</span>
      </div>
      <div style="float: left; width: 600px;clear:both;margin-left: 80px">
        <h4 style="text-align:left;text-indent:25px">  {{scene.description}}</h4><br>
      </div>
    </div>
    <div>
      <el-divider></el-divider>
      <video
        :src="scene.video"
        :controls="videoOptions.controls"
        class="video-js vjs-big-play-centered vjs-fluid"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        style="width: 100%;"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        autoplay="autoplay"
        ref="video">
      </video>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SceneIntroduce",
        data () {
            return {
                scene: {
                        cover: 'http://localhost:8888/bs/static/caaesi.jpg',
                        name: '圣母殿',
                        like: '36',
                        date: '1023 - 1032',
                        author: '宋天圣年间',
                        description: '圣母殿为晋祠古建三绝之一。创建于宋天圣年间（1023年—1032年）。圣母传为叔虞之母邑姜。圣母殿原名“女郎祠”，殿堂宽大疏朗，存有宋代精美彩塑侍女像41尊、明代补塑2尊。这些彩塑中，邑姜居中而座，神态庄严，雍容华贵，凤冠霞帔，是一尊宫廷统治者形象。塑像形象逼真，造型生动，情态各异，是研究宋代雕塑艺术和服饰的珍贵资料。',
                        video: 'http://localhost:8888/bs/static/f5c55702fdbe4c0f98366ee52fe0ea85.mp4'
                    },
                videoOptions: {
                    controls:true,
                },
                player: null,
                playTime:'',
                seekTime:'',
                current:'',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            initVideo() {
                //原生初始化视频方法
                let myVideo = this.$refs.video;
                //ontimeupdate
                myVideo.ontimeupdate = function() {myFunction()};
                let _this = this;

                function myFunction(){
                    let playTime = myVideo.currentTime
                    setTimeout(function () {
                        localStorage.setItem("cacheTime",playTime)
                    },500)
                    let time = localStorage.getItem("cacheTime")
                    // 当前播放位置发生变化时触发。
                    if(playTime - Number(time) > 2){
                        myVideo.currentTime = Number(time)
                    }else{
                    }
                }
            },

                // 播放回调
                onPlayerPlay(player) {
                    // this.globalSetting = true
                    console.log("player play!", player);
                    // document.getElementsByClassName("vjs-control-bar").style.display = "block";
                    // document.getElementsByClassName("vjs-control-bar").style.display = "block";
                },

                // 暂停回调
                onPlayerPause(player) {
                    // this.globalSetting.controls = false;
                    // console.log("player pause!", player);
                    // var video = document.getElementById("video");
                    // video.controls=false;
                    // document.getElementsByClassName("vjs-control-bar").style.display = "none";
                },
            },

            beforeDestroy() {
                if (this.player) {
                    this.player.dispose()
                }
        }
    }
</script>

<style scoped>

</style>
