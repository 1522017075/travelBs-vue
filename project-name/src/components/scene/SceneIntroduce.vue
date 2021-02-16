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
        <span style="font-size: 20px">{{scene.author}}({{scene.date}})</span>
      </div>
      <div style="float: left; width: 600px;clear:both;margin-left: 80px">
        <h4 style="text-align:left;text-indent:25px">  {{scene.description}}</h4><br>
      </div>
    </div>
    <div>
      <baidu-map class="map" center="晋祠公园">
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
        <bm-walking start="晋祠" :end="scene.name" :panel="false" :auto-viewport="true" :selectFirstResult="true" location="晋源区"></bm-walking>
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
                play: true
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            handlePlay() {
                var myVideo = document.getElementById("video");
                this.play = false;
                myVideo.play();
            },
            handlePause() {
                this.play = true;
            },
        },
        mounted() {
            // location.reload();
            var myVideo = document.getElementById("video");
            // myVideo.addEventListener('play', this.handlePlay);
            myVideo.addEventListener('pause', this.handlePause);
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
