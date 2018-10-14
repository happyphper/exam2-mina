<template>
  <div>
    <van-panel :title="'题目：' + (key + 1) + '/' + tableData.length" :desc="'得分：' + score"></van-panel>
    <view v-if="tableData.length">
      <van-panel
        :title="question.title"
        :desc="question.score + '分'"
        :status="question.status"
      >
        <div class="option-container">
          <view v-for="option in question.options" :key="option.id" class="option-item">
            <van-button
              :block="true"
              size="large"
              @click="onSubmit(question.id, option.id)"
              :type="option.status"
            >{{ option.content }}
            </van-button>
          </view>
        </div>
      </van-panel>
    </view>
    <view v-else class="title">
      咦？该试卷没有任何题目
    </view>
  </div>
</template>

<script>
  export default {
    onShow() {
      wx.showLoading({ title: "努力获取试卷中..." });
      this.testId = this.$root.$mp.query.testId;
      this.$http.get(`/tests/${this.testId}/start`).then(response => {
        this.tableData = response.data;
        wx.hideLoading();
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
      });
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
      question() {
        return this.tableData[this.key];
      }
    },
    methods: {
      onSubmit(questionId, optionId) {
        wx.showLoading({ title: "提交答案中..." });
        this.$http.post(`/tests/${this.testId}/questions`, {
          question_id: questionId,
          answer: [optionId]
        }).then(response => {
          this.score = this.score + response.score;
          if (response.is_right) {
            this.question.options.find(item => item.id === optionId).status = "primary";
          } else {
            this.question.options.find(item => item.id === optionId).status = "danger";
            response.question.answer.forEach(id => {
              this.question.options.find(item => item.id === id).status = "primary";
            });
          }
        }).catch(err => {
          console.log(err);
        });
        wx.hideLoading();
        setTimeout(() => {
          if (this.tableData.length === (this.key + 1)) {
            wx.showLoading({ title: "所有题目已完成" });
            wx.navigateTo({ url: "/pages/testResults/main" });
          } else {
            this.key = this.key + 1;
          }
        }, 1500);
      }
    }
  };
</script>

<style>
  .title {
    text-align: center;
    color: #424A60;
  }
  
  .option-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    margin-top: 15 rpx;
    width: 100%;
  }
  .option-item {
    display: block;
    width: 95%;
    margin-top: 20rpx;
  }
</style>
