<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">晋 祠 旅 游</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.phone"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <router-link :to="{path:'/registe'}">
          <el-button type="primary" style="width: 106px;background: #66ccff;border: none" >注册
          </el-button>
        </router-link>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 106px;background: #505458;border: none" v-on:click="login">登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox-group v-model="isAdmin">
          <el-checkbox label="管理员登录" name="type">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-form :inline="true" class="demo-form-inline">
      <el-form>
        <router-link :to="{path:'/findpass'}">
          <el-link type="danger">找回密码</el-link>
        </router-link>
      </el-form>
    </el-form>
  </el-form>
  </body>
</template>

<script>

    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    phone: '',
                    password: ''
                },
                responseResult: [],
                isAdmin: false
            }
        },
        methods: {
            check() {
                var phone = this.loginForm.phone
                var password = this.loginForm.password
                if (phone !== '' && password !== '') {
                    this.login()
                } else {
                    this.$message({
                        type: 'info',
                        message: '账号密码不能为空'
                    })
                }
            },
            openFullScreen2() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    loading.close()
                }, 1000)
            },
            login() {
                let path = '/user/checkUser'
                let toPath = '/index'
                if (this.isAdmin) {
                    path = '/admin/checkAdmin'
                    toPath = '/scene/sceneDetail'
                }
                var _this = this
                this.$axios
                    .post(path, {
                        phone: this.loginForm.phone,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            this.openFullScreen2()
                            _this.$store.commit('login', _this.loginForm)
                            console.log("myInfo:" + JSON.stringify(successResponse.data.data[0]))
                            window.localStorage.setItem('myInfo', JSON.stringify(successResponse.data.data[0]))
                            setTimeout(() => {
                                var path = this.$route.query.redirect
                                this.$router.replace({path: path === '/' || path === undefined ? toPath : path})
                            }, 1000)
                        } else if (successResponse.data.code === 404) {
                            this.$message({
                                type: 'info',
                                message: '账号或密码不正确'
                            })
                        }
                    })
                    .catch(failResponse => {
                    })
            },
            loginTemp() {
                this.$router.replace({path:'index'})
            }
        }
    }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
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
