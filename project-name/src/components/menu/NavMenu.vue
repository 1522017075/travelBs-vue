<template>
  <el-menu
    :default-active="active"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1000px; margin-left: 20px; margin-right: 20px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-button @click="loginOut" type="text" style="margin: 8px;float: right">
      注销登录
    </el-button>
    <el-button @click="drawer = true" type="text" style="margin: 8px;float: right;font-size: 16px">
      {{myInfo.phone}}
    </el-button>
    <el-avatar :size="50" :src="myInfo.head" style="float: right" v-show="myInfo.name !== 'admin'"></el-avatar>
  </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data(key) {
            return {
                navList: [
                    {name: '/scene/sceneDetail', navItem: '景点推荐'},
                    {name: '/order/orderForm', navItem: '游玩预定'},
                    {name: '/myInfo/myInfoManage', navItem: '个人主页'}
                ],
                active: '/scene',
                drawer: false,
                myInfo: []
            }
        },
        mounted: function () {
            this.active = this.$route.path
            var info = window.localStorage.getItem('myInfo')
            const myInfo = JSON.parse(info)
            this.myInfo = myInfo

            if (myInfo.name == 'admin') {
                this.navList.pop()
                this.navList.pop()
                this.navList.push({name: '/userManage', navItem: '用户管理'},{name: '/orderManage', navItem: '预定管理'})
            }
        },
        methods: {
            loginOut() {
                this.$confirm('确定退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    window.localStorage.clear()
                    this.$router.replace('/login')
                    location.reload()
                })
            }
        }
    }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>
