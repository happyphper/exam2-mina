<template>
  <div class="container">
    <h2 class="tip" v-show="!tableData.length">🤥 今日无考试</h2>
    
    <div v-if="tableData.length" v-for="exam in tableData" :key="exam.id" class="exam-container">
      <div class="card" @click="handleStartExam(exam)">
        <van-row>
          <van-col span="8">
            <img src="/static/images/exam_thumb.jpg" class="thumb">
          </van-col>
          <van-col span="16" class="text-container">
            <van-row>
              <van-col span="24" class="exam-course">
                <img src="/static/icons/course.png" class="icon">
                {{ exam.course.title }}
              </van-col>
              <van-col span="24" class="exam-title">
                <img src="/static/icons/exam.png" class="icon">
                {{ exam.title }}
              </van-col>
              <van-col span="24" class="exam-time">
                <img src="/static/icons/start.png" class="icon">
                {{ exam.started_at }}
              </van-col>
              <van-col span="24" class="exam-time">
                <img src="/static/icons/end.png" class="icon">
                {{ exam.ended_at }}
              </van-col>
              <van-col span="24">
                <van-tag type="primary" v-if="exam.status === 'unstart'">未开考</van-tag>
                <van-tag type="danger" v-else-if="exam.status === 'end'">已结束</van-tag>
                <van-tag type="success" v-else>已开考</van-tag>
                <van-tag type="primary" v-if="!exam.result">未答题</van-tag>
                <van-tag type="danger" v-else-if="exam.result && !exam.result.is_finished">答题中</van-tag>
                <van-tag type="success" v-else="exam.result && exam.result.is_finished">已完成</van-tag>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
    </div>
    
    <van-notify id="exam-notify" />
  </div>
</template>

<script>
import Notify from '@/../static/vant/notify/notify';

export default {
  onShow() {
    this.handleRefresh()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getTodayExams(){
      this.$http.get('/today-exams', { include: 'course,result' }).then(response => {
        this.tableData = response.data
        wx.stopPullDownRefresh()
      }).catch(err => {
        wx.stopPullDownRefresh()
        if (!err.response) {
          Notify({
            text: '未知错误',
            duration: 1000,
            selector: '#exam-notify',
            backgroundColor: '#D65048'
          });
        } else if (err.response.status === 401) {
          Notify({
            text: '身份验证过期',
            duration: 1000,
            selector: '#exam-notify',
            backgroundColor: '#D65048'
          });
          setTimeout(() => {
            wx.clearStorage()
            wx.reLaunch({ url: '/pages/index/main' })
          }, 1000)
        } else {
          Notify({
            text: err.response.data.message,
            duration: 1000,
            selector: '#exam-notify',
            backgroundColor: '#D65048'
          });
        }
      })
    },
    handleRefresh() {
      this.getTodayExams()
    },
    handleStartExam(exam) {
      if (exam.result && exam.result.is_finished) {
        wx.navigateTo({ url: '/pages/result/main?examId=' + exam.id })
      } else if (exam.status === 'ongoing') {
        wx.navigateTo({ url: `/pages/paper/main?examId=${exam.id}` })
      } else {
        return false;
      }
    }
  },
  onPullDownRefresh(){
    this.getTodayExams()
  },
}
</script>

<style>
  exam-container {
    margin-bottom: 10rpx;
  }
  .card {
    margin: 0 auto;
    width: 90%;
    height: 200rpx;
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
  .tip {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 30rpx;
    padding: 20rpx;
    color: #000;
  }
</style>
