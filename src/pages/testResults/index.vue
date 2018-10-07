<template>
  <div>
    <div class="result-container" v-for="result in tableData">
      <van-panel :title="result.test.title" :desc="result.is_finished ? '已交卷' : '为交卷'">
        <view class="padding">
          <p class="text">成绩：{{ result.score }} / {{ result.total_score }}</p>
          <p class="text">正确/错误：{{ result.right_count }} / {{ result.wrong_count }}</p>
          <p class="text">完成/总数：{{ result.finished_count }} / {{ result.questions_count }}</p>
          <p class="text">开考/交卷：{{ result.created_at }} - {{ result.updated_at }}</p>
        </view>
      </van-panel>
    </div>
  </div>
</template>

<script>
  export default {
    onShow() {
      this.$http.get('/test-results', { include: 'test' }).then(response => {
        this.tableData = response.data
      }).catch(err => {
        console.log(err)
      })
    },
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
  .text {
    text-align: left;
    color: #424A60;
    font-size: 25rpx;
  }
  .padding {
    padding: 0 30rpx;
  }
  .result-container {
    margin: 10rpx;
    border: 1rpx solid #ccc;
    border-radius: 5rpx;
    box-shadow: 5rpx 5rpx 5rpx #888888;
  }
</style>
