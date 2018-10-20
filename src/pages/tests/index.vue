<template>
  <div class="test-container">
    <van-notice-bar
      mode="closeable"
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
    />
    <div class="card">
      <van-row>
        <van-col span="8">
          <img src="/static/images/test_thumb.jpeg" class="thumb">
        </van-col>
        <van-col span="16" class="text-container">
          <van-row>
            <van-col span="24" class="test-course">
              <img src="/static/icons/course.png" class="icon">
              旅游文化
            </van-col>
            <van-col span="24" class="test-title">
              <img src="/static/icons/test.png" class="icon">
              旅游专业2018-12-12日常测评
            </van-col>
            <van-col span="24" class="test-time">
              <img src="/static/icons/start.png" class="icon">
              2018-12-12 08:00:00
            </van-col>
            <van-col span="24" class="test-time">
              <img src="/static/icons/end.png" class="icon">
              2018-12-12 09:00:00
            </van-col>
            <van-col span="24">
              <van-tag  type="success">已完成</van-tag>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <div class="card">
      <van-row>
        <van-col span="8">
          <img src="/static/images/cover.jpeg" class="thumb">
        </van-col>
        <van-col span="16" class="text-container">
          <van-row>
            <van-col span="24" class="test-course">
              <img src="/static/icons/course.png" class="icon">
              旅游文化
            </van-col>
            <van-col span="24" class="test-title">
              <img src="/static/icons/test.png" class="icon">
              旅游专业2018-12-12日常测评
            </van-col>
            <van-col span="24" class="test-time">
              <img src="/static/icons/start.png" class="icon">
              2018-12-12 08:00:00
            </van-col>
            <van-col span="24" class="test-time">
              <img src="/static/icons/end.png" class="icon">
              2018-12-12 09:00:00
            </van-col>
            <van-col span="24">
              <van-tag type="primary">未答题</van-tag>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

export default {
  onShow() {
  
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
  
  }
}
</script>

<style>
  .test-container {
    width: 100%;
    height: 100%;
    background-color: #371C5D;
    color: white;
    text-align: center;
  }
  .card {
    margin: 20rpx auto;
    width: 90%;
    height: 200rpx;
    background-color: #fff;
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
</style>
