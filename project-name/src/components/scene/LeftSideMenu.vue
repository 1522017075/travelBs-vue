<template>
  <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-active="'/myInfo/myInfoManage'">
      <el-menu-item index="1" :index="'/myInfo/myInfoManage'">
        <i class="el-icon-s-custom"></i>
        <span slot="title">圣母殿</span>
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
