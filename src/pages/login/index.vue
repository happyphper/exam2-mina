<template>
  <div class="login-container">
    <input type="text" placeholder="请输入手机/学号" class="input-container">
    <input type="password" placeholder="请输入密码" class="input-container">
    <button type="default" hover-class="button-hover"> 登录 </button>
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast";
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      onClickIcon() {
        Toast("初始密码：123456");
      },
      onSubmit() {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '验证',
          loadingType: 'spinner',
          selector: '#login-toast',
        });
        this.$http.post('/auth/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          wx.setStorageSync('token', response.access_token)
          this.password = null
          wx.switchTab({ url: '/pages/index/main' })
        }).catch((err) => {
          Toast.clear()
          if (err.response.status === 422) {
            const values = Object.values(err.response.data.errors);
            Notify({
              text: values.join(';'),
              duration: 1500,
              selector: '#login-error-notify',
              backgroundColor: '#CB4B45'
            });
          } else {
            Notify({
              text: err.response.data.message || '错误',
              duration: 1500,
              selector: '#login-error-notify',
              backgroundColor: '#CB4B45'
            });
          }
        })
      },
      onInputUsername(event) {
        this.username = event.mp.detail
      },
      onInputPassword(event) {
        this.password = event.mp.detail
      }
    }
  }
</script>
<style scoped>
  .login-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #371C5D;
    color: white;
    font-size: 30rpx;
  }
  .input-container {
    background-color: #FFFFFF;
    width: 80%;
    margin: 50rpx auto;
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
  .button-hover {
    background-color: #F7C443;
  }
</style>
