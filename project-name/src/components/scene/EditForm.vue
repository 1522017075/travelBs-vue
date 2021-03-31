<template>
  <div>
    <i class="el-icon-circle-plus-outline" @click="dialogFormVisible = true"></i>
    <el-dialog title="景点操作" :visible.sync="dialogFormVisible" @close="clear">
      <el-form :model="scene" style="text-align: left" ref="scene" :rules="rules">
        <el-form-item label="景点名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="scene.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" :label-width="formLabelWidth" prop="scenedate">
<!--          <el-input v-model="scene.scenedate" autocomplete="off" placeholder="数字，如1076"></el-input>-->
          <el-date-picker
            v-model="scene.scenedate"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所在朝代" :label-width="formLabelWidth" prop="author">
          <el-input v-model="scene.author" autocomplete="off"  placeholder="文字，如宋朝"></el-input>
        </el-form-item>
        <el-form-item label="景点图片" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="scene.cover" autocomplete="off" placeholder="图片 URL" :disabled="true"></el-input>
          <img-up-load @onUpload="uploadImg" ref="imgUpload"></img-up-load>
        </el-form-item>
        <el-form-item label="景点描述" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="scene.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="视频简介" :label-width="formLabelWidth" prop="video">
          <el-input v-model="scene.video" autocomplete="off" placeholder="视频 URL" :disabled="true"></el-input>
          <video-up-load ref="videoUpload" @onUpload="uploadVideo"></video-up-load>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="scene.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('scene')">确 定</el-button>
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
                    id:'',
                    cover: '',
                    name: '',
                    scenelike: '',
                    scenedate: '',
                    author: '',
                    description: '',
                    video: ''
                },
                formLabelWidth: '120px',
                rules: {
                    cover: [
                        { required: true, message: '请选择图片', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入景点名称', trigger: 'blur' }
                    ],
                    scenedate: [
                        { required: true, message: '请输入朝代日期', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入朝代', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入景点描述', trigger: 'blur' }
                    ],
                    video: [
                        { required: true, message: '请选择介绍视频', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            clear(){
                this.scene = {
                    id: '',
                    cover: '',
                    name: '',
                    scenelike: '',
                    scenedate: '',
                    author: '',
                    description: '',
                    video: ''
                }
            },
            onSubmit(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/scene/insertOrUpdate', {
                            id: this.scene.id,
                            name: this.scene.name,
                            scenedate: new Date(this.scene.scenedate).getFullYear(),
                            author: this.scene.author,
                            description: this.scene.description,
                            cover: this.scene.cover,
                            video: this.scene.video
                        }).then(response => {
                            if (response.data.code == 200) {
                                this.dialogFormVisible = false
                                this.$message.success('操作成功！')
                            }
                            location.reload()
                        })
                        this.$emit('successAdd')
                    }
                })

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
