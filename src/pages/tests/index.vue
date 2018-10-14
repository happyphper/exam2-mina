<template>
  <div class="app-container">
    <div v-if="tableData.length" class="test-container">
      <van-card
        v-for="test in tableData" :key="test.id"
        :title="test.title"
        :desc="test.course.title"
        thumb="/static/images/test_thumb.jpeg"
        @click="onStartTest(test)">
        <view slot="footer">
          <van-tag plain mask type="success" v-if="test.result && test.result.is_finished">已交卷</van-tag>
          <van-tag plain mask type="primary" v-else-if="test.result && !test.result.is_finished">答题中</van-tag>
          <van-tag plain mask type="danger" v-else>未答题</van-tag>
          <p class="text">开考时间：{{ test.started_at }}</p>
          <p class="text">结束时间：{{ test.ended_at }}</p>
        </view>
      </van-card>
    </div>
    <div class="title" v-else>😰 很遗憾，今日没有考试。</div>
    
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '@/../static/vant/toast/toast';

export default {
  onShow() {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh() {
    this.fetchTests()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    fetchTests() {
      this.$http.get('/today-tests', { include: 'course,result' }).then(response => {
        this.tableData = response.data
        Toast.clear()
        wx.stopPullDownRefresh()
      }).catch(err => {
        Toast.fail(err.response.message)
      })
    },
    onStartTest(test) {
      if (test.result && test.result.is_finished) {
        wx.navigateTo({ url: '/pages/testResults/main' })
      } else {
        wx.navigateTo({ url: '/pages/paper/main?testId=' + test.id })
      }
    }
  }
}
</script>

<style>
  .title {
    text-align: center;
    color: #424A60;
  }
  .text {
    font-size: 20rpx;
  }
  .test-container {
    margin: 0 10rpx 10rpx 10rpx;
    border: 1rpx solid #ccc;
    border-radius: 5rpx;
    box-shadow: 5rpx 5rpx 5rpx #888888;
  }
</style>
