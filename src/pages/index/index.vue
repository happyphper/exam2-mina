<template>
  <div class="container">
    <img src="/static/images/lhdx_logo.png" class="logo">
    <span>登录用户：{{ user.name }}</span>
  </div>
</template>

<script>
  export default {
    onShow() {
      if (!wx.getStorageSync('token')) {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      } else if (!wx.getStorageSync('user'))  {
        wx.showLoading({ title: '获取信息中...' })
        this.$http.get('/auth/me').then(response => {
          wx.setStorageSync('user', response)
          wx.hideLoading()
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
        })
      } else {
        this.user = wx.getStorageSync('user')
      }
    },
    data() {
      return {
        user: null
      }
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
