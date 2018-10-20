<template>
  <div class="paper-container">
    <div class="question-container">
      <div class="header">
        <img src="/static/icons/single_color.png" class="icon">
        <h2 class="question-tip">1 / 10</h2>
      </div>
      <h2 class="question-title">以下哪个成语是"风平浪静"的反义词？</h2>
      <h2 class="question-tip">5 分</h2>
      <h3 class="question-option selected">天下太平</h3>
      <h3 class="question-option error">轩然大波</h3>
      <h3 class="question-option success">平安无事</h3>
    </div>
    <div class="footer">
      <div class="footer-item">
        <img src="/static/icons/user_color.png" class="small-icon">
        1000
      </div>
      <div class="footer-item">
        <img src="/static/icons/accuracy_color.png" class="small-icon">
        50%
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    onShow() {
    
    },
    data() {
      return {
        key: 0,
        score: 0,
        testId: null,
        tableData: []
      };
    },
    computed: {
    
    },
    methods: {
    
    }
  };
</script>

<style>
  .paper-container {
    width: 100%;
    height: 100%;
    background-color: #371C5D;
  }
  .question-container {
    width: 80%;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx;
  }
  .header {
    text-align: center;
  }
  .footer {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-size: 30rpx;
    color: #A6A6A6;
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .footer-item {
    width: 40%;
    height: 50rpx;
    background-color: #fff;
    border-radius: 50rpx;
    padding: 20rpx;
  }
  .small-icon {
    width: 25rpx;
    height: 25rpx;
  }
  .icon {
    width: 50rpx;
    height: 50rpx;
    padding: 20rpx;
    border: 5rpx solid #ccc;
    border-radius: 50rpx;
  }
  .question-title {
    text-align: left;
  }
  .question-option {
    margin-top: 30rpx;
    text-align: left;
    border: 1px solid #ccc;
    border-radius: 20rpx;
    padding: 20rpx;
  }
  .question-tip {
    text-align: center;
    font-size: 24rpx;
  }
  .selected {
    background-color: #371C5D;
    color: #fff;
  }
  .error {
    background-color: #D34B66;
    color: #fff;
  }
  .success {
    background-color: #50B7AD;
    color: #fff;
  }
</style>
