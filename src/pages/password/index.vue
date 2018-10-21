<template>
  <div class="container">
    <div class="form-container">
      <div class="form-item">
        <input type="password" v-model="form.old_password" placeholder="请输入旧密码">
      </div>
      <div class="form-item">
        <input type="password" v-model="form.password" placeholder="请输入新密码">
      </div>
      <div class="form-item">
        <input type="password" v-model="form.password_confirmation" placeholder="确认密码">
      </div>
      <div class="form-item">
        <button type="default" hover-class="button-hover" :loading="loading" @click="onSubmit">确认</button>
      </div>
    </div>
    <van-notify id="password-notify" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    data() {
      return {
        form: {
          old_password: "",
          password: "",
          password_confirmation: ""
        },
        loading: false
      };
    },
    methods: {
      onSubmit() {
        this.loading = true
        this.$http.put('/password', this.form).then(() => {
          wx.clearStorage()
          wx.reLaunch({ url: '/pages/index/main' });
        }).catch(err => {
          if (!err.response) {
            Notify({
              text: '未知错误',
              duration: 1000,
              selector: '#password-notify',
              backgroundColor: '#D65048'
            });
          } else if (err.response.status === 401) {
            Notify({
              text: '身份验证过期',
              duration: 1000,
              selector: '#paper-notify',
              backgroundColor: '#D65048'
            });
            setTimeout(() => {
              wx.clearStorage()
              wx.reLaunch({ url: '/pages/index/main' })
            }, 1000)
          } else if (err.response.status === 422) {
            const messgae = Object.values(err.response.data.errors).join(';')
            Notify({
              text: messgae,
              duration: 1000,
              selector: '#password-notify',
              backgroundColor: '#D65048'
            });
          } else {
            Notify({
              text: err.response.data.message,
              duration: 1000,
              selector: '#password-notify',
              backgroundColor: '#D65048'
            });
          }
        })
      }
    }
  };
</script>

<style>
  .form-item {
    margin-bottom: 20rpx;
    text-align: left;
    font-size: 26rpx;
  }
  input {
    background-color: #FFFFFF;
    width: 80%;
    margin: 0 auto;
    padding: 15rpx;
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
  
  .button-hover {
    background-color: #F7C443;
  }
</style>
