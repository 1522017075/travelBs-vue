<template>
  <el-card class="box-card card">
    <div slot="header" class="clearfix">
      <h3>我的头像</h3>
    </div>
    <div>
      <div>
        <el-image
          style="width: 150px; height: 150px"
          :src="ruleForm.head" :lazy="true"></el-image>
      </div>

      <el-upload
        class="img-upload"
        ref="upload"
        action="http://localhost:8888/bs/user/up"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button type="success" >点击修改为新头像</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog title="上传头像" :visible.sync="dialogVisible2" width="30%">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth"
                        ref="uploadElement">

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </el-card>

</template>

<script>
    export default {
        name: "MyHeadManage",
        inject: ['reload'],
        data () {
            return {
                fileList: [],
                hideUpload: false,
                dialogImageUrl: '',
                dialogVisible: false,//图片预览弹窗
                formLabelWidth: '80px',
                limitNum: 1,
                form: {},
                dialogVisible2: false,//弹窗
                ruleForm: {
                    id: '',
                    phone: '',
                    password: '',
                    mail: '',
                    gender: '',
                    age: '',
                    profile: '',
                    head: ''
                }
            }
        },
        mounted: function () {
            var info = window.localStorage.getItem('myInfo')
            this.ruleForm = JSON.parse(info)
            console.log(this.ruleForm.head)
        },
        methods: {
            handleRemove (file, fileList) {
            },
            handlePreview (file) {
            },
            handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove (file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess (response) {
                var info = window.localStorage.getItem('myInfo')
                this.ruleForm = JSON.parse(info);
                this.$axios.post('/user/update',{
                    id: this.ruleForm.id,
                    phone: this.ruleForm.phone,
                    password: this.ruleForm.password,
                    mail: this.ruleForm.mail,
                    age: this.ruleForm.age,
                    gender: this.ruleForm.gender,
                    profile: this.ruleForm.profile,
                    head: response
                }).then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.$message({
                            type: 'info',
                            message: '修改头像成功！'
                        })
                        this.dialogVisible2 = false
                        console.log("myInfo:" + JSON.stringify(successResponse.data.data[0]))
                        window.localStorage.setItem('myInfo', JSON.stringify(successResponse.data.data[0]))
                        var info = window.localStorage.getItem('myInfo')
                        this.ruleForm = JSON.parse(info);
                        this.reload();
                    }
                })
            },
            clear () {
                this.$refs.upload.clearFiles()
            },
            uploadFile () {
                this.$refs.upload.submit()
            }
        }
    }
</script>

<style scoped>
   .hide .el-upload--picture-card {
     display: none;
   }
  .card{
    width: 600px;
    margin-left: 50px;
  }
</style>
