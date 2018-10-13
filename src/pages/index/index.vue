<template>
  <div class="container">
    <img src="/static/images/lhdx_logo.png" style="width:480rpx;height:480rpx;margin: 30 rpx;">
    <span>登录用户：{{ name }}</span>
  </div>
</template>

<script>
  export default {
    onShow() {
      if (!wx.getStorageSync("token")) {
        wx.redirectTo({
          url: "/pages/login/main"
        });
      } else if (!wx.getStorageSync("user")) {
        wx.showLoading({ title: "获取信息中..." });
        this.$http.get("/auth/me").then(response => {
          wx.setStorageSync("user", response);
          wx.hideLoading();
        }).catch(err => {
          wx.hideLoading();
        });
      } else {
        this.user = wx.getStorageSync("user");
      }
    },
    computed: {
      name() {
        return this.user ? this.user.name : "游客";
      }
    },
    data() {
      return {
        user: null
      };
    },
    methods: {}
  };
</script>
<style scoped>

</style>
