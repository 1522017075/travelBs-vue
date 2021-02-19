<template>
  <el-container>
    <el-header height="100px" style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="phone" placeholder="请输入手机号" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 160px">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="users" style="width: 70%;margin-left: 20%">
        <el-table-column prop="id" label="编号" width="50"></el-table-column>
        <el-table-column prop="head" width="60">
          <template slot-scope="scope">
            　　　　<img :src="scope.row.head" width="40" height="40"/>
            　　</template>
        </el-table-column>

        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="mail" label="邮箱" width="180"></el-table-column>
        <el-table-column label="删除" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "UserManage",
        data(){
            return{
                phone: '',
                users:[]
            }
        },
        methods: {
            onSubmit(){
                this.$axios.post('/user/getUser', {
                    phone: this.phone
                })
                .then(resp => {
                    this.users = resp.data.data
                })
            },
            editStudent(item){

            },
            handleDelete(item){
                this.$confirm('是否删除 '+item.phone+' ?', '˙○˙ฅ', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.$axios.post('/user/deleteUser', {
                        id: item.id
                    }).then(resp => {
                        if (resp && resp.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }
                        this.reload()
                    })
                })
            }
        },
        mounted() {
            this.$axios.post('/user/list', {
                id: 1
            })
            .then(resp => {
                if(resp.data.code == 200){
                    this.users = resp.data.data
                }
            })
        }
    }
</script>

<style scoped>

</style>
