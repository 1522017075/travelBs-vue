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
      <el-table :data="orders" style="width: 70%;margin-left: 20%">
        <el-table-column prop="id" label="预约编号" width="90"></el-table-column>

        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="num" label="预定人数" width="100"></el-table-column>
        <el-table-column prop="bookdate" label="预约日期" width="180"></el-table-column>
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
        name: "OrderManage",
        data(){
            return{
                phone: '',
                orders:[]
            }
        },
        methods: {
            onSubmit(){
                this.$axios.post('/reserve/selectReserve', {
                    phone: this.phone
                }).then(resp => {
                    if (resp.data.code == 200){
                        var now = Date.now();
                        for(var i = 0; i < resp.data.data.length; i++){
                            var temp = resp.data.data[i].bookdate;
                            resp.data.data[i].isOut = (temp > now) ? 0 : 1;
                            resp.data.data[i].bookdate = new Date(parseInt(temp)).toLocaleDateString();
                        }
                        this.orders = resp.data.data
                    } else {
                        this.clearTable()
                    }
                });
            },
            editStudent(item){

            },
            clearTable(){
                this.orders = []
            },
            handleDelete(item){
                this.$confirm('是否删除 '+item.phone+' ?', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.$axios.post('/reserve/delete', {
                        id: item.id
                    }).then(resp => {
                        if (resp && resp.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            location.reload()
                        }
                    })
                })
            }
        },
        mounted() {
            this.$axios.post('/reserve/list', {
                id: 1
            })
                .then(resp => {
                    if(resp.data.code == 200){
                        var now = Date.now();
                        for(var i = 0; i < resp.data.data.length; i++){
                            var temp = resp.data.data[i].bookdate;
                            resp.data.data[i].isOut = (temp > now) ? 0 : 1;
                            resp.data.data[i].bookdate = new Date(parseInt(temp)).toLocaleDateString();
                        }
                        this.orders = resp.data.data
                    }
                })
        }
    }
</script>

<style scoped>

</style>
