<template>
  <div class="container">
    <div class="question-container" v-if="!question">
      <h2>题目加载中...</h2>
    </div>
    <div class="question-container" v-if="question">
      <div class="header">
        <img src="/static/icons/single_color.png" class="icon">
        <h2 class="question-tip">{{ key + 1 }} / {{ tableData.length }}</h2>
      </div>
      <h2 class="question-title">{{ question.title }}</h2>
      <h2 class="question-tip">{{ question.score }}</h2>
      <div v-for="option in question.options" :key="option.id">
        <h3 class="question-option" :class="{ selected: option.selected, success: option.status === 1, error: option.status === 2 }" @click="handleSelectOption(option)">{{ option.content }}</h3>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item">
        <img src="/static/icons/user_color.png" class="small-icon">
        {{ answeringCount }}
      </div>
      <div class="footer-item">
        <img src="/static/icons/accuracy_color.png" class="small-icon">
        {{ question.accuracy }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    onShow() {
      this.testId = this.$mp.query.testId
      this.getTest()
    },
    data() {
      return {
        testId: null,
        tableData: [],
        answeringCount: 0,
        key: 0,
        score: 0,
        question: null,
        disabled: false
      };
    },
    computed: {
      question() {
        return this.tableData[this.key]
      }
    },
    methods: {
      getTest() {
        this.$http.get(`/tests/${this.testId}/start`, { include: 'result' }).then(response => {
          this.tableData = response.data
          this.answeringCount = response.meta.answering_count
          this.question = this.tableData[this.key]
        }).catch(err => {
          console.log(err)
        })
      },
      toggleQuestion() {
        this.key = this.key + 1
        if (this.tableData.length >= this.key) {
          setTimeout(() => {
            wx.redirectTo({ url: '/pages/result/main' })
          }, 1500)
        } else {
          setTimeout(() => {
            this.question = this.tableData[this.key]
          }, 1500)
        }
      },
      handleSelectOption(option) {
        if (this.disabled) {
          return false
        }
        this.disabled = true
        option.selected = true
        this.$http.post(`/tests/${this.testId}/questions`, {
          question_id: this.question.id,
          answer: [option.id]
        }).then(response => {
          if (response.question.type === 'single') {
            // 单选
            const answer = response.question.answer[0]
            this.question.options.map(item => {
              // 设置正确答案和错误答案
              if (item.id == answer) {
                item.status = 1
              } else if (item.id === option.id && answer != option.id) {
                item.status = 2
              } else {
                item.status = 0
              }
            })
          } else {
            // 多选
            const answer = response.question.answer
            this.question.options.map(item => {
              item.status = answer.includes(option.id) ? 1 : 0
            })
          }
          this.toggleQuestion()
        }).catch(err => {
          console.log(err)
        })
      },
      
    }
  };
</script>

<style>
  .question-container {
    width: 80%;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx;
    color: #000;
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
