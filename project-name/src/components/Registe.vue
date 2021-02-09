<template>
  <body id="poster">
  <el-form>
<!--    <el-form>-->
<!--      <el-image :src="require('../assets/jinci.jpg')" fit="cover" style="height: 200px"></el-image>-->
<!--    </el-form>-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-container">
      <h3 class="login_title">晋 祠 旅 游 网 站 注 册</h3>
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="mail">
        <el-input v-model="ruleForm.mail"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="gender">
        <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
        <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="age" v-model.number="ruleForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form :inline="true" class="demo-form-inline">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 10px">立即注册</el-button>
        <router-link :to="{path:'/login'}">
          <el-link type="danger">已有账号，去登陆</el-link>
        </router-link>
      </el-form>
    </el-form>
  </el-form>
  </body>
</template>

<script>
  export default {
      name : "Registe",
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
                  gender: '男',
                  age: ''
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
                  ],
                  age : [
                      { required: true, message: '年龄不能为空'},
                      { type: 'number', message: '年龄必须为数字值'}
                  ]
              }
          }
      },
      methods: {
          submitForm(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      var _this = this
                      this.$axios.post("/user/registe", {
                              phone: this.ruleForm.phone,
                              password: this.ruleForm.password,
                              mail: this.ruleForm.mail,
                              age: this.ruleForm.age,
                              gender: this.ruleForm.gender
                          })
                          .then(successResponse => {
                              if (successResponse.data.code === 200) {
                                  setTimeout(() => {
                                      this.$message({
                                          type: 'info',
                                          message: '注册成功，即将跳转登陆页面'
                                      })
                                      this.$router.replace({path: '/login'})
                                  }, 1000)
                              } else if (successResponse.data.code === 404) {
                                  this.$message({
                                      type: 'info',
                                      message: '该手机号已注册，请直接登陆'
                                  })
                              }
                          })

                  } else {
                      return false;
                  }
              });
          },
          resetForm(formName) {
              this.$refs[formName].resetFields();
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
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  #poster {
    background: url("../assets/jinci.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0px;
  }
 </style>
