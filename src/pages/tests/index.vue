<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {id:1, title: '旅游管理', started_at: '2018-12-12 10:00:00', ended_at: '2018-12-12 12:00:00', course: { id: 1, title: '酒店管理' }},
        {id:2, title: '酒店管理', started_at: '2018-12-12 10:00:00', ended_at: '2018-12-12 12:00:00', course: { id: 1, title: '酒店管理' }}
      ]
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
  .text {
    font-size: 20rpx;
  }
</style>
