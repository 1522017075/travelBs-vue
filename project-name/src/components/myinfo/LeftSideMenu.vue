<template>
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="'/myInfo/myInfoManage'">
        <el-menu-item index="1" :index="'/myInfo/myInfoManage'">
          <i class="el-icon-s-custom"></i>
          <span slot="title">我的信息</span>
        </el-menu-item>
        <el-menu-item index="2" :index="'/myInfo/myHeadManage'">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">我的头像</span>
        </el-menu-item>
        <el-menu-item index="3" :index="'/myInfo/myReserveManage'">
          <i class="el-icon-mobile-phone"></i>
          <span slot="title">我的预定</span>
        </el-menu-item>
      </el-menu>
  </el-aside>
</template>

<script>
    export default {
        name: "LeftSideMenu",
        methods: {

        }
    }
</script>

<style scoped>
</style>
