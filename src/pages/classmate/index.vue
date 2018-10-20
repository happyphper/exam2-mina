<template>
  <div class="container">
    <div class="card">
      <img src="/static/images/avatar.png" class="avatar">
      <div class="info">
        <p>王宝龙</p>
        <p class="student_id">学号：110430042</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      };
    },
    methods: {}
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
