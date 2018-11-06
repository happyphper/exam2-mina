<template>
  <div class="container">
    <van-notice-bar
      mode="closeable"
      text="当页面显示为空时，则今日暂无考试，不过你可以尝试下拉刷新，重新获取"
    />
    <h1 class="page-title"> 考 评 统 计 </h1>
    <div class="exam-container">
      <div class="avatar-container">
        <img :src="avatar" class="avatar">
        <p>{{ user.name }}</p>
      </div>
      <div class="info-container">
        <div class="left-container">
          <h3>已答过题目</h3>
          <h4>{{ questionsCount }}</h4>
        </div>
        <div class="right-container">
          <h3>已参加考试</h3>
          <h4>{{ examsCount }}</h4>
        </div>
      </div>
    </div>
    <div class="footer">
      <button>排行榜</button>
    </div>
    <van-notify id="home-notify" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    onShow() {
      this.getDashboardStat()
    },
    data() {
      return {
        questionsCount: 0,
        examsCount: 0
      }
    },
    computed: {
      user() {
        return wx.getStorageSync('user')
      },
      avatar() {
        return this.user.avatar ? this.user.avatar : '/static/images/avatar.png'
      }
    },
    methods: {
      getDashboardStat() {
        this.$http.get('/stats/dashboard').then(response => {
          this.questionsCount = response.questions_count
          this.examsCount = response.exams_count
        }).catch(err => {
          if (!err.response) {
            Notify({
              text: '未知错误',
              duration: 1000,
              selector: '#home-notify',
              backgroundColor: '#D65048'
            });
          } else if (err.response.status === 401) {
            Notify({
              text: '身份验证过期',
              duration: 1000,
              selector: '#home-notify',
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
              selector: '#home-notify',
              backgroundColor: '#D65048'
            });
            setTimeout(() => {
              wx.switchTab({ url: '/pages/exams/main' })
            }, 500)
          }
        })
      }
    }
  };
</script>
<style scoped>
  .page-title {
    font-size: 50rpx;
  }
  .exam-container {
    margin: 10rpx auto;
    width: 80%;
    background: #fff;
    height: 500rpx;
    border-radius: 30rpx;
  }
  .avatar-container {
    padding: 20rpx;
    color: #3B2685;
  }
  .avatar {
    width: 100rpx;
    height: 100rpx;
  }
  .info-container {
    margin: 10rpx auto;
    width: 80%;
    height: 200rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    align-content: center;
    vertical-align: center;
  }
  .left-container,.right-container {
    height: 100%;
    width: 50%;
    border-top: 1rpx solid #ccc;
    border-bottom: 1rpx solid #ccc;
  }
  .left-container > h3, .right-container > h3 {
    color: #ccc;
    padding: 20rpx;
    height: 40%;
  }
  .left-container{
    border-right: 1rpx solid #ccc;
  }
  .left-container > h4, .right-container > h4 {
    height: 40%;
    color: #000;
    font-size: 60rpx;
  }
  button {
    margin-top: 50rpx;
    width: 80%;
    background-color: #5D4A7D;
    color: #fff;
    border-radius: 98rpx;
  }
</style>
