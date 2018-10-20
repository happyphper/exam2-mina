<template>
  <div class="container">
    <div class="result-container">
      <p>
        <img src="/static/icons/course.png" class="icon">
        旅游文化
      </p>
      <p>
        <img src="/static/icons/test.png" class="icon">
        旅游专业第一次考试
      </p>
      <p>
        <img src="/static/icons/grade.png" class="icon">
        100</p>
      <p>
        <img src="/static/icons/question.png" class="icon">
        10 / 10</p>
      <p>
        <img src="/static/icons/time.png" class="icon">
        10 秒
      </p>
      <p>
        <img src="/static/icons/date.png" class="icon">
        2018-12-12 08:00:00
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: 0,
        testId: null,
        tableData: []
      };
    },
    
    methods: {
    
    }
  };
</script>

<style>
  .result-container {
    margin:0 auto;
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
