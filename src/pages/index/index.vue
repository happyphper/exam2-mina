<template>
  <div class="container">
    <van-notice-bar
      mode="closeable"
      text="当页面显示为空时，则今日暂无考试，不过你可以尝试下拉刷新，重新获取"
    />
    <div class="logo">
      <img src="/static/images/lhdx_logo.png" class="logo">
    </div>
    <div class="title-container">
      <h1 class="title">北京联合大学</h1>
      <h2 class="subtitle">考评小程序</h2>
    </div>
    <div class="button-container">
      <a @click="handlePhoneLogin">手机号/学号登录</a>
      <a @click="handleWechatLogin" class="wechat-login">
        <img src="/static/icons/wechat.png" class="wechat-icon">
        微信登录
        </a>
    </div>
    <div class="footer">
      @2018 北京联合大学
    </div>
    <van-toast id="index-toast"></van-toast>
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast";
  
  export default {
    onShow() {
      if (wx.getStorageSync('token') || wx.getStorageSync('user')) {
        wx.switchTab({ url: '/pages/home/main' })
      }
    },
    data() {
      return {};
    },
    methods: {
      handlePhoneLogin() {
        wx.navigateTo({ url: '/pages/login/main' })
      },
      handleWechatLogin() {
        Toast({
          selector:"#index-toast",
          type:"fail",
          message:"暂不支持微信登录"
        })
      }
    }
  };
</script>
<style scoped>
  .logo{
    width: 240rpx;
    height: 240rpx;
    margin: 0 auto;
    border-radius: 150rpx;
  }
  .title-container {
    position: relative;
    top: 10%;
  }
  .title {
      font-size: 70rpx;
    }
  .subtitle {
    font-size: 50rpx;
  }
  .button-container {
    position: relative;
    top:20%;
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
