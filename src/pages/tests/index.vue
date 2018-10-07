<template>
  <div>
    <view v-if="tableData.length">
      <van-card
        v-for="test in tableData"
        :key="test.id"
        :title="test.title"
        :desc="test.course.title"
        thumb="/static/images/test_thumb.jpeg"
        @click="onStartTest">
        <view slot="footer">
          <p class="text">开考时间：{{ test.started_at }}</p>
          <p class="text">结束时间：{{ test.ended_at }}</p>
        </view>
      </van-card>
    </view>
    <view class="title" v-else>暂无考试计划</view>
  </div>
</template>

<script>
export default {
  onShow() {
    wx.showLoading({ title: '努力获取考试信息中...'})
    this.$http.get('/today-tests').then(response => {
      this.tableData = response.data
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  data () {
    return {
      tableData: []
    }
  },

  created () {},
  methods: {
    onStartTest() {
      wx.navigateTo({ url: '/pages/paper/main' })
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
</style>
