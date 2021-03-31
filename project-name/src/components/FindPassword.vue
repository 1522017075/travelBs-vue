<template>
  <body id="poster">
  <el-form>
    <!--    <el-form>-->
    <!--      <el-image :src="require('../assets/jinci.jpg')" fit="cover" style="height: 200px"></el-image>-->
    <!--    </el-form>-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-container">
      <h3 class="login_title">找 回 密 码</h3>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="mail">
        <el-input v-model="ruleForm.mail"></el-input>
      </el-form-item>
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="验证码：">
          <el-input v-model="ruleForm.code" placeholder="验证码" style="width: 134px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="reCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
        <el-form-item label="重置密码:" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      <el-form :inline="true" class="demo-form-inline">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 10px">修改密码</el-button>
        <router-link :to="{path:'/login'}">
          <el-link type="danger">记得密码，去登陆</el-link>
        </router-link>
      </el-form>
    </el-form>
  </el-form>
  </body>
</template>

<script>
    export default {
        name : "FindPassword",
        data() {
            var validatePhone = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入手机号"));
                } else {
                    if (!/^1[3456789]\d{9}$/.test(value)) {
                        callback(new Error("请输入正确的手机号"));
                    } else {
                        callback();
                    }
                }
            };
            return {
                ruleForm: {
                    phone: '',
                    password: '',
                    mail: '',
                    code: '',
                    returnCode: ''
                },
                rules: {
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' }
                    ],
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.code == this.returnCode) {
                        this.$axios.post("/user/updatePass", {
                            phone: this.ruleForm.phone,
                            password: this.ruleForm.password
                        }).then(resp =>{
                            if(resp.data.code == 200){
                                setTimeout(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '修改密码成功，即将跳转登陆页面'
                                    })
                                    this.$router.replace({path: '/login'})
                                }, 600)
                            }
                        })
                    } else {
                        this.$message({
                            type: 'info',
                            message: '有空选项或验证码不正确，请重新输入'
                        })
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            reCode(){
                this.$axios.post("/user/getCode", {
                    phone: this.ruleForm.phone,
                    password: this.ruleForm.password,
                    mail: this.ruleForm.mail
                })
                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.ruleForm.returnCode = successResponse.data.data
                    }
                })
            }
        }
    }
</script>

<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 400px;
    padding: 15px 15px 15px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  #poster {
    background: url("../assets/jinci.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  body {
    margin: 0px;
  }
</style>
