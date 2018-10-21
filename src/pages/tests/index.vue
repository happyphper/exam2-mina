<template>
  <div class="container">
    <h2 class="tip" v-show="!tableData.length">🤥 今日无考试</h2>
    
    <div v-if="tableData.length" v-for="test in tableData" :key="test.id" class="test-container">
      <div class="card" @click="handleStartTest(test)">
        <van-row>
          <van-col span="8">
            <img src="/static/images/test_thumb.jpeg" class="thumb">
          </van-col>
          <van-col span="16" class="text-container">
            <van-row>
              <van-col span="24" class="test-course">
                <img src="/static/icons/course.png" class="icon">
                {{ test.course.title }}
              </van-col>
              <van-col span="24" class="test-title">
                <img src="/static/icons/test.png" class="icon">
                {{ test.title }}
              </van-col>
              <van-col span="24" class="test-time">
                <img src="/static/icons/start.png" class="icon">
                {{ test.started_at }}
              </van-col>
              <van-col span="24" class="test-time">
                <img src="/static/icons/end.png" class="icon">
                {{ test.end }}
              </van-col>
              <van-col span="24">
                <van-tag type="primary" v-if="!test.result">未答题</van-tag>
                <van-tag type="danger" v-else-if="test.result && !test.result.is_finished">答题中</van-tag>
                <van-tag type="success" v-else="test.result && test.result.is_finished">已完成</van-tag>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
    </div>
    
    <van-notify id="test-notify" />
  </div>
</template>

<script>
import Notify from '@/../static/vant/notify/notify';

export default {
  mounted() {
    this.handleRefresh()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getTodayTests(){
      this.$http.get('/today-tests', { include: 'course,result' }).then(response => {
        this.tableData = response.data
        wx.stopPullDownRefresh()
      }).catch(err => {
        if (!err.response) {
          Notify({
            text: '未知错误',
            duration: 1000,
            selector: '#test-notify',
            backgroundColor: '#D65048'
          });
        } else {
          Notify({
            text: err.response.data.message,
            duration: 1000,
            selector: '#test-notify',
            backgroundColor: '#D65048'
          });
        }
        wx.stopPullDownRefresh()
      })
    },
    handleRefresh() {
      this.getTodayTests()
    },
    handleStartTest(test) {
      if (test.result && test.result.is_finished) {
        wx.navigateTo({ url: '/pages/result/main' })
      } else {
        wx.navigateTo({ url: `/pages/paper/main?testId=${test.id}` })
      }
    }
  },
  onPullDownRefresh(){
    this.getTodayTests()
  },
}
</script>

<style>
  test-container {
    margin-bottom: 10rpx;
  }
  .card {
    margin: 0 auto;
    width: 90%;
    height: 200rpx;
    border-radius: 30rpx;
    padding: 20rpx;
    color: #000;
    background-color: #FFFFFF;
  }
  .thumb {
    display: inline-block;
    width: 200rpx;
    height: 200rpx;
    float: left;
    vertical-align: middle;
  }

  .text-container {
    text-align: left;
    font-size: 28rpx;
  }
  .icon {
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
  }
  .tip {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 30rpx;
    padding: 20rpx;
    color: #000;
  }
</style>
