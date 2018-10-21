<template>
  <div class="container">
    <div class="card" v-if="!tableData.length">
      你还没有同班同学
    </div>
    <div v-else>
      <div class="card" v-for="classmate in tableData" :key="classmate.id">
        <img :src="classmate.avatar ? classmate.avatar : '/static/images/avatar.png'" class="avatar">
        <div class="info">
          <p>{{ classmate.name }}</p>
          <p class="student_id">学号：{{ classmate.student_id }}</p>
        </div>
      </div>
    </div>
   
    <van-notify id="classmate-notify" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    mounted() {
      this.getClassmates()
    },
    data() {
      return {
        tableData: []
      };
    },
    methods: {
      getClassmates() {
        this.$http.get('/classmates').then(response => {
          this.tableData = response.data
        }).catch(err => {
          if (!err.response) {
            Notify({
              text: '未知错误',
              duration: 1000,
              selector: '#classmate-notify',
              backgroundColor: '#D65048'
            });
          } else if (err.response.status === 401) {
            Notify({
              text: '身份验证过期',
              duration: 1000,
              selector: '#classmate-notify',
              backgroundColor: '#D65048'
            });
            setTimeout(() => {
              wx.clearStorage()
              wx.reLaunch({ url: '/pages/index/main' })
            }, 1000)
          } else {
            Notify({
              text: err.response.data.message,
              duration: 1000,
              selector: '#classmate-notify',
              backgroundColor: '#D65048'
            });
          }
        })
      }
    }
  };
</script>

<style>
  .card {
    width: 95%;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    align-content: left;
    color: #000;
    margin-bottom: 5rpx;
    border-radius: 10rpx;
    padding: 10rpx;
  }
  .avatar {
    width: 100rpx;
    height: 100rpx;
    background-color: #ccc;
    border:1px solid #ccc;
    border-radius: 20rpx;
  }
  p {
    margin-left: 10rpx;
    text-align: left;
    font-size: 35rpx;
    line-height: 50rpx;
  }
  .student_id {
    font-size: 30rpx;
    color: #9A9A9A;
  }
</style>
