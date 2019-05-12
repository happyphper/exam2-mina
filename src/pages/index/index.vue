<template>
  <div class="container">
    <div class="logo">
      <img class="logo" src="/static/images/lhdx_logo.png">
    </div>
    <div class="title-container">
      <h1 class="title">北京联合大学</h1>
      <h2 class="subtitle">考评小程序</h2>
    </div>
    <div class="button-container">
      <a @click="handlePhoneLogin">手机号/学号登录</a>
      <button open-type="getUserInfo" class="wechat-login" lang="zh_CN" @getuserinfo="handleAuthorize" :loading="loading" :disabled="loading">
        <img class="wechat-icon" src="/static/icons/wechat.png">
        <span>微信授权登录</span>
      </button>
    </div>
    <div class="footer">@2019 北京联合大学</div>
    <van-toast id="index-toast"></van-toast>
    <van-notify id="wechat-login-notify" />
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
import Notify from '@/../static/vant/notify/notify';

export default {
  onShow() {
    if (wx.getStorageSync("token") || wx.getStorageSync("user")) {
      wx.switchTab({ url: "/pages/home/main" });
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handlePhoneLogin() {
      wx.navigateTo({ url: "/pages/login/main" });
    },
    // 授权
    handleAuthorize() {
      this.loading = true
      const promise = new Promise((resolve, reject) => {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  resolve()
                },
                fail: function () {
                  reject()
                }
              })
            } else {
              resolve()
            }
          }
        })
      })

      promise.then(() => {
        let user = {
          nickname: '',
          avatar: '',
          gender: ''
        }
        wx.getUserInfo({
          success(res) {
            const userInfo = res.userInfo
            user.nickname = userInfo.nickName
            user.avatar = userInfo.avatarUrl
            user.gender = userInfo.gender
          }
        })

        this.handleWechatLogin(user)
      }).catch(err => {
        Notify({
          text: '您拒绝了授权，无法进行微信登录。',
          duration: 3000,
          selector: "#wechat-login-notify",
          backgroundColor: "#D65048"
        });
        return
      }).finally(() => {
        this.loading = false
      })
    },
    // 登录
    handleWechatLogin(user) {
      wx.login({
        success: res => {
          if (res.code) {
            // console.log(111, user)
            this.$http
              .post("/wechat/login", {
                code: res.code,
                ...user
              })
              .then((response) => {
                // 未与系统绑定
                if (response.status_code === 404) {
                  wx.navigateTo({ url: "/pages/register/main" });
                } else {
                  wx.setStorageSync("token", response);
                  return this.$http.get("/auth/me", { include: "classroom" });
                }
              })
              .then(response => {
                wx.setStorageSync("user", response);
                wx.switchTab({ url: "/pages/home/main" });
              })
              .catch(err => {
                this.loading = false;
                if (!err.response) {
                  Notify({
                    text: "未知错误",
                    duration: 1000,
                    selector: "#wechat-login-notify",
                    backgroundColor: "#D65048"
                  });
                } else {
                  Notify({
                    text: err.response.data.message,
                    duration: 1000,
                    selector: "#wechat-login-notify",
                    backgroundColor: "#D65048"
                  });
                }
              })
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  }
}
</script>
<style scoped>
.logo {
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
  top: 20%;
  text-align: center;
  color: white;
  font-size: 30rpx;
}
.wechat-login {
  margin-top: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: #f7c443;
  height: 80rpx;
  line-height: 80rpx;
  width: 400rpx;
  padding: 20rpx;
  border: 1 rpx;
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
