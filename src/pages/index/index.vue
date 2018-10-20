<template>
  <div class="index-container">
    <div class="title-container">
      <h1 class="title">北京联合大学</h1>
      <h2 class="subtitle">考评小程序</h2>
    </div>
    <div class="button-container">
      <a>手机号/学号登录</a>
      <a class="wechat-login">
        <img src="/static/icons/wechat.png" class="wechat-icon">
        微信登录
        </a>
    </div>
    <div class="footer">
      @2018 北京联合大学
    </div>
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast";
  
  export default {
    onShow() {
      wx.switchTab({ url: '/pages/home/main' })
      // if (!wx.getStorageSync("token")) {
      //   wx.redirectTo({
      //     url: "/pages/login/main"
      //   });
      // } else if (!wx.getStorageSync("user")) {
      //   Toast.loading({
      //     duration: 0,
      //     forbidClick: true,
      //     message: '读取信息',
      //     loadingType: 'spinner',
      //     selector: '#home-toast',
      //   });
      //   this.$http.get("/auth/me", { include: 'group' }).then(response => {
      //     wx.setStorageSync("user", response);
      //     wx.switchTab({ url: '/pages/tests/main' })
      //   }).catch(err => {
      //     Toast.clear()
      //     Notify({
      //       text: err.response.data.message || '错误',
      //       duration: 1500,
      //       selector: '#home-error-notify',
      //       backgroundColor: '#ff4534'
      //     });
      //   });
      // } else {
      //   wx.switchTab({ url: '/pages/tests/main' })
      // }
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
<style scoped>
  .index-container {
    width: 100%;
    height: 100%;
    background-color: #371C5D;
    color: white;
    text-align: center;
  }
  .title-container {
    position: relative;
    top: 30%;
  }
  .title {
      font-size: 70rpx;
    }
  .subtitle {
    font-size: 50rpx;
  }
  .button-container {
    position: relative;
    top:40%;
    text-align: center;
    color: white;
    font-size: 30rpx;
  }
  .wechat-login {
    margin: 100rpx auto;
    display: block;
    background:#F7C443;
    height: 50rpx;
    width: 400rpx;
    padding: 20rpx;
    border:1 rpx;
    border-radius: 50rpx;
    color: black;
    font-size: 30rpx;
  }
  .wechat-icon {
    display: inline-block;
    vertical-align: middle;
    width: 40rpx;
    height: 40rpx;
  }
  .footer {
    position: absolute;
    height: 50rpx;
    width: 100%;
    bottom: 10rpx;
    text-align: center;
    font-size: 20rpx;
  }
</style>
