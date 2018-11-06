<template>
  <div class="container">
    <div class="login-container">
      <div class="form-item">
        <input type="text" v-model="form.username" placeholder="请输入手机/学号" class="input-container">
      </div>
      <div class="form-item">
        <input type="password" v-model="form.password" placeholder="请输入密码" class="input-container">
      </div>
      <div class="form-item">
        <button type="default" :loading="loading" hover-class="button-hover" @click="onSubmit"> 登录 </button>
      </div>
    </div>
    <van-notify id="login-notify" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        loading: false
      };
    },
    methods: {
      onSubmit() {
        if (!this.form.username || !this.form.password) {
          Notify({
            text: '账户/密码必填',
            duration: 1000,
            selector: '#login-notify',
            backgroundColor: '#D65048'
          });
        }
        this.loading = true
        this.$http.post('/auth/login', this.form).then(response => {
          wx.setStorageSync('token', response)
          return this.$http.get('/auth/me', { include: 'classroom' })
        }).then(response => {
          wx.setStorageSync('user', response)
          wx.switchTab({ url: '/pages/home/main' })
        }).catch(err => {
          this.loading = false
          if (!err.response) {
            Notify({
              text: '未知错误',
              duration: 1000,
              selector: '#login-notify',
              backgroundColor: '#D65048'
            });
          } else {
            Notify({
              text: err.response.data.message,
              duration: 1000,
              selector: '#login-notify',
              backgroundColor: '#D65048'
            });
          }
        })
      }
    }
  }
</script>
<style scoped>
  .form-item {
    margin-bottom: 20rpx;
    text-align: left;
    font-size: 26rpx;
  }
  .input-container {
    background-color: #FFFFFF;
    width: 80%;
    margin: 0 auto;
    padding:15rpx;
    border-radius: 98rpx;
    color: #000000;
  }
  button {
    width: 80%;
    margin-top: 20rpx;
    background-color: #D5D0DD;
    color: #5F4C7E;
    border-radius: 98rpx;
  }

  button:after {
    border-radius: 98rpx;
  }
</style>
