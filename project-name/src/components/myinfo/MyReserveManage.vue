<template>
  <div>
    <div v-for="item in myReserve">
      <div style="height: 200px;width: 200px;background: red;">
        {{item.phone}}
        <br>{{item.num}}
        <br>{{item.bookdate}}
        <br>{{item.id}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MyReserveManage",
        data() {
            return {
                phone:'',
                form: {
                    bookdate: '1613551217208'
                },
                myReserve: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                }
            }
        },
        mounted() {
            var info = window.localStorage.getItem('myInfo')
            this.phone = JSON.parse(info).phone;

            this.$axios.post('/reserve/myReserve', {
                phone: this.phone
            }).then(successResponse => {
                if (successResponse.data.code === 200) {
                    for(var i = 0; i < successResponse.data.data.length; i++){
                        var temp = successResponse.data.data[i].bookdate;
                        successResponse.data.data[i].bookdate = new Date(parseInt(temp)).toLocaleDateString();
                    }
                    this.myReserve = successResponse.data.data

                }else{
                    alert("error")
                }
            })
        }
    }
</script>

<style scoped>

</style>
