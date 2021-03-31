<template>
  <div>
    <div v-for="item in myReserve">
      <div style="padding-left: 50px">
        <el-card class="box-card" :class="item.isOut == 1 ? 'out': 'new'">
          <div slot="header" class="clearfix">
            <span style="float: left;font-size: 20px">预定号：{{item.id}}</span>
            <el-button
              style="float: right; padding: 3px 0; margin-left: 8px;width: 24px" type="danger"
              class="el-icon-delete"
              @click="deleteReserve(item.id)"></el-button>
            <div v-if="item.sceneid == 0 && item.isOut">
              <el-button style="float: right; padding: 3px 0" type="text" :ref="item.id" @click="recommend(item.id)">点此推荐景点</el-button>
            </div>
            <div v-if="!item.isOut">
              <el-button style="float: right; padding: 3px 0" type="text" :ref="item.id" @click="changeTime(item.id, item.bookdate)">改签</el-button>
            </div>
          </div>

          <div class="text">
            <span>预定号码：{{item.phone}}</span>
            <br>
            <span>预定人数：{{item.num}}人游览</span>
            <br>
            <span>预定日期：{{item.bookdate}}</span>
            <br>
            <span v-if="item.sceneid == 0 && item.isOut == 0" style="color: red">
              请在预定时间内游览！
            </span>

            <span v-if="item.isOut == 1">
              <span>推荐景点：</span>

              <span v-if="item.sceneid == 0"  style="color: red">
              尚未推荐景点！
              </span>
              <span v-if="item.sceneid != 0">
              {{item.scenename}}
              </span>
            </span>

          </div>
        </el-card>
      </div>
    </div>
    <el-dialog title="推荐本单喜爱景点" :visible.sync="dialogFormVisible" width="16%">
      <el-form>
        <el-form-item>
          <el-select v-model="recommendScene" placeholder="请选择喜欢的景点" value="1" @change="submitDisable = false">
            <el-option
              v-for="item in scenes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()" :disabled="submitDisable">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="改签时间" :visible.sync="dialogFormVisible2" width="16%">
      <el-form>
        <el-form-item>
            <el-date-picker
              v-model="changeTimeIs"
              type="date"
              placeholder="更改时间"
              :picker-options="pickerOptions"
              @change="submitDisable = false">
            </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changeTimeto()" :disabled="submitDisable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "MyReserveManage",
        data() {
            return {
                phone:'',
                dialogFormVisible: false,
                dialogFormVisible2: false,
                changeTimeIs: '',
                submitDisable: true,
                nowTime: '',
                scenes: [],
                recommendId: '',
                recommendScene: '',
                myReserve: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                }
            }
        },
        mounted() {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            this.changeTimeIs = date.getTime();

            var info = window.localStorage.getItem('myInfo')
            this.phone = JSON.parse(info).phone;

            this.nowTime = Date.now();

            this.$axios.post('/reserve/myReserve', {
                phone: this.phone
            }).then(successResponse => {
                if (successResponse.data.code === 200) {
                    var now = Date.now();
                    for(var i = 0; i < successResponse.data.data.length; i++){
                        var temp = successResponse.data.data[i].bookdate;
                        successResponse.data.data[i].isOut = (temp > now) ? 0 : 1;
                        successResponse.data.data[i].bookdate = new Date(parseInt(temp)).toLocaleDateString();
                    }
                    this.myReserve = successResponse.data.data
                }
            });
            this.$axios.post('/scene/list').then(successResponse => {
                if (successResponse.data.code === 200) {
                    this.scenes = successResponse.data.data
                }
            })
        },
        inject: ['reload'],
        methods: {
            submit() {
                this.dialogFormVisible = false
                this.$axios.post('/reserve/update', {
                    id: this.recommendId,
                    sceneid: this.recommendScene
                }).then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.reload();
                    }
                })
            },
            changeTimeto(){
                this.$axios.post('/reserve/update',{
                    id:this.recommendId,
                    bookdate: new Date(this.changeTimeIs).getTime()
                }).then(successResponse => {
                    if (successResponse.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '改签成功!'
                        })
                        this.dialogFormVisible2 = false
                        this.reload();
                    }
                })
            },
            recommend(num){
                this.dialogFormVisible = true;
                this.recommendScene = '';
                this.submitDisable = true;
                this.recommendId = num
            },
            changeTime(num, bookdate){
                this.dialogFormVisible2 = true;
                this.submitDisable = true;
                this.recommendId = num;
                this.changeTimeIs = bookdate
            },
            deleteReserve(id){
                this.$confirm('是否删除该条预订单？', '˙○˙ฅ', {
                    confirmButtonText: '是',
                    cancelButtonText: '非',
                    type: 'info'
                }).then(() => {
                    this.$axios.post('/reserve/delete', {
                        id
                    }).then(resp => {
                        if (resp && resp.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.reload()
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>
  .text {
    font-size: 16px;
    width: 200px;
    margin-bottom: 20px;
  }

  .text span{
    float: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-top: 20px;
  }

  .out{
    background: url("../../assets/out.png") no-repeat;
    background-color: #edffed;
    background-size:100% 100%;
    opacity: 0.8;
  }

  .new{
    background: white;
  }
</style>
