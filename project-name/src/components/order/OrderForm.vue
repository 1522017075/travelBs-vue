<template>
  <div style="min-width: 500px;max-width:500px;margin-left: 30%;height: 600px">
    <el-steps :active="active" simple>
      <el-step title="预留手机" icon="el-icon-phone"></el-step>
      <el-step title="预定信息" icon="el-icon-edit"></el-step>
      <el-step title="预订成功" icon="el-icon-check"></el-step>
    </el-steps>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px" v-show="flag">
      <el-form-item label="手机号">
        <el-input v-model="form.phone" :disabled="true" style="width: 220px"></el-input>
      </el-form-item>
      <el-form-item label="预定人数">
        <el-select v-model="form.num" placeholder="请选择预计人数">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-date-picker
          v-model="form.bookdate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width:140px">确认预约</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <h1 v-show="!flag">
      <i class="el-icon-circle-check" style="font-size: 40px"></i>
      预订单已提交，后续请在
      <router-link :to="{path:'/myInfo/myReserveManage'}">个人主页 </router-link>查看！
    </h1>
    <el-divider></el-divider>
    <h2 style="text-align: left">须知：</h2>
    <div style="text-align: left">
      <h4>· 景点开放时间：9:00 — 17:00</h4>
      <h4>· 购物须知：</h4>
      <h5>  预订票只包含入门权限，进场消费自理</h5>
      <h4>· 景点联系电话：18334768171</h4>
      <h4>· 此在线预订最终解释权归景点所有！</h4>
    </div>
  </div>
</template>

<script>
    export default {
        name: "OrderForm",
        data() {
            return {
                form: {
                    phone: '',
                    num: '1',
                    bookdate: '',
                },
                flag: true,
                active: 2,
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                }
            }
        },
        methods: {
            onSubmit() {
                this.$axios.post('/reserve/add',{
                    phone: this.form.phone,
                    num: this.form.num,
                    bookdate: new Date(this.form.bookdate).getTime()
                }).then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.flag = false;
                        this.active = 3;

                    }else{
                        alert("error")
                    }
                })
            }
        },
        mounted() {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            this.form.bookdate = date.getTime();

            var info = window.localStorage.getItem('myInfo')
            this.form.phone = JSON.parse(info).phone;
        }
    }
</script>

<style scoped>

</style>
