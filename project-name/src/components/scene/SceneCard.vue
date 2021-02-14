<template>
  <div>
    <div style="height: 50px">
      <div style="float: left">
        <h1 style="color: red">
          <i class="el-icon-guide" style="font-size:40px"></i><span style="font-size: 30px">景点推荐</span>
        </h1>
      </div>
    </div>
    <el-divider></el-divider>
    <el-row style="height: 840px;">
      <router-link :to="{path:'/scene/sceneIntroduce'}">
        <el-tooltip effect="dark" placement="right"
                    v-for="item in scenes"
                    :key="item.id">
          <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
          <p slot="content" style="font-size: 13px;margin-bottom: 6px">
            <span>{{item.date}}</span> /
            <span>{{item.author}}</span>
          </p>
          <p slot="content" style="width: 300px" class="abstract">{{item.description}}</p>
          <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                   bodyStyle="padding:10px" shadow="hover">
            <div class="cover">
  <!--            <img :src="item.cover" alt="封面" fit="contain">-->
              <el-image
                style="width: 115px; height: 172px"
                :src="item.cover"
                fit="cover"></el-image>
            </div>
            <div class="info">
              <div class="title">
                <a href="">{{item.name}}</a>
              </div>
            </div>
            <div class="author">
              <i class="el-icon-s-flag" style="color: red"></i>{{item.like}}人推荐
            </div>
          </el-card>
        </el-tooltip>
      </router-link>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="20">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'SceneCard',
        data () {
            return {
                scenes: [
                    {
                        cover: 'http://localhost:8888/bs/static/caaesi.jpg',
                        name: '圣母殿',
                        like: '36',
                        date: '1023 - 1032',
                        author: '宋天圣年间',
                        description: '圣母殿为晋祠古建三绝之一。创建于宋天圣年间（1023年—1032年）。圣母传为叔虞之母邑姜。圣母殿原名“女郎祠”，殿堂宽大疏朗，存有宋代精美彩塑侍女像41尊、明代补塑2尊。这些彩塑中，邑姜居中而座，神态庄严，雍容华贵，凤冠霞帔，是一尊宫廷统治者形象。塑像形象逼真，造型生动，情态各异，是研究宋代雕塑艺术和服饰的珍贵资料。'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>

