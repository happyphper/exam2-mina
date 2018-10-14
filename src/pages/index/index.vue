<template>
  <div class="container">
    <img src="/static/images/lhdx_logo.png" style="width:480rpx;height:480rpx;margin: 30 rpx;">
  
    <van-toast id="home-toast"/>
    <van-notify id="home-error-notify" />
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast";
  
  export default {
    onShow() {
      if (!wx.getStorageSync("token")) {
        wx.redirectTo({
          url: "/pages/login/main"
        });
      } else if (!wx.getStorageSync("user")) {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '读取信息',
          loadingType: 'spinner',
          selector: '#home-toast',
        });
        this.$http.get("/auth/me", { include: 'group' }).then(response => {
          wx.setStorageSync("user", response);
          wx.switchTab({ url: '/pages/tests/main' })
        }).catch(err => {
          Toast.clear()
          Notify({
            text: err.response.data.message || '错误',
            duration: 1500,
            selector: '#home-error-notify',
            backgroundColor: '#ff4534'
          });
        });
      } else {
        wx.switchTab({ url: '/pages/tests/main' })
      }
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
<style scoped>

</style>
