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
    <el-row style="height: 640px;">
        <el-tooltip effect="dark" placement="right"
                    v-for="item in scenes"
                    :key="item.id">
          <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
          <p slot="content" style="font-size: 13px;margin-bottom: 6px">
            <span>{{item.scenedate}}</span> /
            <span>{{item.author}}</span>
          </p>
          <p slot="content" style="width: 300px" class="abstract">{{item.description}}</p>
          <el-card style="width: 194px;margin-bottom: 20px;height: 175px;float: left;margin-right: 15px" class="book"
                   bodyStyle="padding:10px" shadow="hover">
            <div class="cover">
  <!--            <img :src="item.cover" alt="封面" fit="contain">-->
              <el-image
                style="width: 172px; height: 115px"
                :src="item.cover"
                fit="cover"
                @click="detail(item.id)"></el-image>
            </div>
            <div class="info">
              <div class="title">
                {{item.name}}
              </div>
            </div>
            <div class="author">
              <i class="el-icon-s-flag" style="color: red"></i>{{item.scenelike}}人推荐
            </div>
          </el-card>
        </el-tooltip>
      <edit-form></edit-form>
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
    import EditForm from "./EditForm";
    export default {
        name: 'SceneCard',
        inject: ['reload'],
        components: {EditForm},
        data () {
            return {
                scenes: []
            }
        },
        mounted() {
            this.$axios.post('/scene/list')
                .then(successResponse => {
                if (successResponse.data.code === 200) {
                    this.scenes = successResponse.data.data
                }
            })
        },
        methods:{
            detail(id){
                this.reload();
                this.$router.push({path: "/scene/sceneIntroduce", query: {id: id}})
            }
        }
    }
</script>

<style scoped>
  .cover {
    width: 172px;
    height: 115px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 172px;
    height: 115px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: center;
  }

  .author {
    color: #333;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: center;
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

