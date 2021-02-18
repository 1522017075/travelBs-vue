<template>
  <div>
    <i class="el-icon-circle-plus-outline" @click="dialogFormVisible = true"></i>
    <el-dialog title="景点操作" :visible.sync="dialogFormVisible" @close="clear">
      <el-form v-model="scene" style="text-align: left" ref="dataForm">
        <el-form-item label="景点名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="scene.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" :label-width="formLabelWidth" prop="scenedate">
          <el-input v-model="scene.scenedate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="景点图片" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="scene.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-up-load @onUpload="uploadImg" ref="imgUpload"></img-up-load>
        </el-form-item>
        <el-form-item label="景点描述" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="scene.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频简介" :label-width="formLabelWidth" prop="video">
          <el-input v-model="scene.video" autocomplete="off" placeholder="视频 URL"></el-input>
          <video-up-load ref="videoUpload" @onUpload="uploadVideo"></video-up-load>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="scene.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import ImgUpLoad from "../manage/ImgUpLoad";
    import VideoUpLoad from "../manage/VideoUpLoad";
    export default {
        name: "EditForm",
        components: {VideoUpLoad, ImgUpLoad},
        data() {
            return {
                dialogFormVisible: false,
                scene: {
                    cover: '',
                    name: '',
                    scenelike: '',
                    scenedate: '',
                    author: '',
                    description: '',
                    video: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            clear(){
                this.scene = {
                    cover: '',
                    name: '',
                    scenelike: '',
                    scenedate: '',
                    author: '',
                    description: '',
                    video: ''
                }
            },
            onSubmit(){

            },
            uploadImg () {
                this.scene.cover = this.$refs.imgUpload.url
            },
            uploadVideo() {
                this.scene.video = this.$refs.videoUpload.videoForm.videoUrl
            }

        }
    }
</script>

<style scoped>
  .el-icon-circle-plus-outline {
    margin: 10px 0 0 20px;
    font-size: 120px;
    float: left;
    cursor: pointer;
  }
</style>
