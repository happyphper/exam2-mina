<template>
  <div class="container">
    <div v-if="!tableData.length">
      <div class="result-container">
        您还没有考试记录
      </div>
    </div>
    <div v-if="tableData.length" v-for="result in tableData" :key="result.id" class="margin-bottom">
      <div class="result-container">
        <p>
          <img src="/static/icons/course.png" class="icon">
          {{ result.course.title }}
        </p>
        <p>
          <img src="/static/icons/test.png" class="icon">
          {{ result.test.title }}
        </p>
        <p>
          <img src="/static/icons/grade.png" class="icon">
          {{ result.score }} 分</p>
        <p>
          <img src="/static/icons/question.png" class="icon">
          {{ result.wrong_count }} / {{ result.questions_count }}（正确/题目）</p>
        <p>
          <img src="/static/icons/time.png" class="icon">
          用时 {{ result.consumed_seconds }} 秒
        </p>
        <p>
          <img src="/static/icons/date.png" class="icon">
          完成于 {{ result.updated_at }}
        </p>
      </div>
    </div>
    <van-notify id="result-notify" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    mounted() {
      if (!this.tableData.length || this.$mp.query.testId) {
        this.getResults()
      }
    },
    data() {
      return {
        key: 0,
        testId: null,
        tableData: []
      };
    },
    methods: {
      getResults() {
        this.$http.get('/test-results', {
          include: 'course,test'
        }).then(response => {
          this.tableData = response.data
          wx.stopPullDownRefresh()
        }).catch(err => {
          wx.stopPullDownRefresh()
          if (!err.response) {
            Notify({
              text: '未知错误',
              duration: 1000,
              selector: '#result-notify',
              backgroundColor: '#D65048'
            });
          } else if (err.response.status === 401) {
            Notify({
              text: '身份验证过期',
              duration: 1000,
              selector: '#result-notify',
              backgroundColor: '#D65048'
            });
            setTimeout(() => {
              wx.clearStorage()
              wx.reLaunch({ url: '/pages/index/main' })
            }, 1000)
          } else if (err.response.status === 422) {
            const messgae = Object.values(err.response.data.errors).join(';')
            Notify({
              text: messgae,
              duration: 1000,
              selector: '#result-notify',
              backgroundColor: '#D65048'
            });
          } else {
            Notify({
              text: err.response.data.message,
              duration: 1000,
              selector: '#result-notify',
              backgroundColor: '#D65048'
            });
          }
        })
      }
    },
    onPullDownRefresh(){
      this.getResults()
    },
  };
</script>

<style>
  .margin-bottom {
    margin-bottom: 10rpx;
  }
  .result-container {
    margin: 0 auto;
    width: 90%;
    background-color: #fff;
    border-radius: 30rpx;
    color: #000;
    text-align: left;
    padding: 20rpx;
    font-size: 30rpx;
  }
  .icon {
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
  }
</style>
