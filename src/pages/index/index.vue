<template>
  <div class="container">
    <img src="/static/images/lhdx_logo.png" class="logo">
  </div>
</template>

<script>
  export default {
    onShow() {
      // if (!wx.getStorageSync("user")) {
      //   wx.navigateTo({
      //     url: '/pages/login/main'
      //   })
      // }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style scoped>
  .logo {
    width: 400rpx;
    height: 400rpx;
  }
</style>
