<template>
  <div class="home-container">
    <h1 class="page-title"> 考 评 统 计 </h1>
    <div class="test-container">
      <div class="avatar-container">
        <img src="/static/images/avatar.png" class="avatar">
        <p>王宝龙</p>
      </div>
      <div class="info-container">
        <div class="left-container">
          <h3>已获得分数</h3>
          <h4>100</h4>
        </div>
        <div class="right-container">
          <h3>已参加考试</h3>
          <h4>25</h4>
        </div>
      </div>
    </div>
    <div class="footer">
      <button>排行榜</button>
    </div>
  </div>
</template>

<script>
  export default {
    onShow() {
    
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
<style scoped>
  .home-container {
    width: 100%;
    height: 100%;
    background-color: #371C5D;
    color: white;
    text-align: center;
  }
  .page-title {
    font-size: 50rpx;
  }
  .test-container {
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
