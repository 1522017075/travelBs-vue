<template>
  <div>
    <div style="display: inline-block; min-width: 90%">
      <el-divider></el-divider>
      <el-page-header @back="goBack" content="景点详情"/>
      <div class="father">
        <el-image
          style="width: 400px; height: 300px;position: absolute;z-index: 15"
          :src="scene.cover"
          v-show="play"
          @click="handlePlay"
          fit="cover"/>
        <img src="../../assets/playButton.png" v-show="play" @click="handlePlay">
        <video id="video" controls="controls" style="width: 400px; height: 300px" :poster="scene.cover">
          <source :src="scene.video" type="video/ogg" />
          <source :src="scene.video"  type="video/mp4">
        </video>
      </div>
      <div style="float: left; height: 60px;clear:right;margin-left: 80px;margin-top: 50px">
        <span style="font-size: 40px">{{scene.name}}</span><br>
        <span style="font-size: 20px">{{scene.scenedate}}</span><br><br>
      </div>
      <div style="float: left; width: 600px;clear:both;margin-left: 80px">
        <h4 style="text-align:left;text-indent:25px">  {{scene.description}}</h4><br>
      </div>
    </div>
      <div style="min-height: 860px">
      <baidu-map class="map" center="晋祠公园" v-loading="loading" :zoom="17">
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
        <bm-walking start="晋祠" :end="scene.name" :panel="true" :auto-viewport="true" :selectFirstResult="false" location="太原"></bm-walking>
      </baidu-map>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SceneIntroduce",
        data () {
            return {
                scene: {
                        cover: '',
                        name: '',
                        scenelike: '',
                        scenedate: '',
                        author: '',
                        description: '',
                        video: ''
                    },
                videoOptions: {
                    controls:true,
                },
                player: null,
                playTime:'',
                seekTime:'',
                loading:true,
                current:'',
                play: true,
                dialogForm: false
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            handlePlay() {
                var myVideo = document.getElementById("video");
                this.play = false;
                myVideo.src = this.scene.video;
                myVideo.play();
            },
            handlePause() {
                this.play = true;
            }
        },
        mounted() {
            this.$axios.post('/scene/getScene',{
                id: this.$route.query.id
            }).then(resp => {
                if(resp.data.code == 200){
                    this.scene = resp.data.data[0]
                }
            })
            var myVideo = document.getElementById("video");
            myVideo.src = this.scene.video;
            myVideo.addEventListener('pause', this.handlePause);

            setTimeout(() => {
                this.loading = false;
            }, 600);
        }
    }
</script>

<style scoped>
  .father {
    background-color: white;
    float: left;
    height: 300px;
    margin-left: 80px;
    margin-top: 50px;
  }

  .father img{
    position: absolute;
    width: 50px;
    z-index: 16;
    margin-left: 180px;
    margin-top: 140px;
  }
  .map {
    width: 100%;
    height: 500px;
  }
</style>
