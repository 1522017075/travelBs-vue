<template>
  <body id = "form">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" :disabled="flag"  show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="mail">
        <el-input v-model="ruleForm.mail" :disabled="flag"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-radio v-model="ruleForm.gender" :disabled="flag" label="男">男</el-radio>
        <el-radio v-model="ruleForm.gender" :disabled="flag" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄：" prop="age">
        <el-input type="age" v-model.number="ruleForm.age" :disabled="flag" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="个签：">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          maxlength="30" show-word-limit
          v-model="ruleForm.profile" :disabled="flag">
        </el-input>
      </el-form-item>
      <el-form :inline="true" class="demo-form-inline" style="margin-left: 90px">
        <el-button type="primary" @click="updateInfo()" style="margin-right: 10px" :disabled="flag">确认修改</el-button>
        <el-button type="info" @click="changeInfo()" style="margin-right: 10px">修改个人信息</el-button>
      </el-form>
    </el-form>
  </body>
</template>

<script>
    export default {
        name: "MyInfoManage",
        mounted: function () {
            var info = window.localStorage.getItem('myInfo')
            this.ruleForm = JSON.parse(info);
        },
        data() {
            return {
                ruleForm: {
                    id: '',
                    phone: '',
                    password: '',
                    mail: '',
                    gender: '',
                    age: '',
                    profile: '',
                    head: ''
                },
                flag: true
            }
        },
        methods: {
          changeInfo(){
              if (this.flag){
                  this.flag = false
              } else {
                  // this.flag = true
              }
          },
            updateInfo(){
                this.$axios.post("/user/update", {
                    id: this.ruleForm.id,
                    phone: this.ruleForm.phone,
                    password: this.ruleForm.password,
                    mail: this.ruleForm.mail,
                    age: this.ruleForm.age,
                    gender: this.ruleForm.gender,
                    profile: this.ruleForm.profile
                })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            this.$message({
                                type: 'info',
                                message: '修改个人信息成功！'
                            })

                            console.log("myInfo:" + JSON.stringify(successResponse.data.data[0]))
                            window.localStorage.setItem('myInfo', JSON.stringify(successResponse.data.data[0]))
                            var info = window.localStorage.getItem('myInfo')
                            this.ruleForm = JSON.parse(info);
                        }
                    })
            }
        }
    }
</script>

<style scoped>
#form{
  margin-left: 200px;
}
</style>
