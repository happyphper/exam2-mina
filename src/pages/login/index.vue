<template>
  <div>
    <div class="container">
      <image src="/static/images/lhdx_logo.png" class="logo" style="width:480rpx;height:480rpx;margin: 30 rpx;"/>
    </div>
    
    <van-cell-group>
      <van-field
        :value="username"
        required
        clearable
        label="账户"
        icon="question"
        placeholder="请输入用户名/手机/学号"
        @clickIcon="onClickIcon"
        @input="onInputUsername"
      />
      
      <van-field
        :value="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        required
        :border="true"
        @input="onInputPassword"
      />
    </van-cell-group>
    
    <van-button
      size="large"
      type="primary"
      :block="true"
      style="margin: 15rpx;"
      @click="onSubmit"
    >登录
    </van-button>
    
    <!--<van-button-->
      <!--size="large"-->
      <!--type="primary"-->
      <!--:block="true"-->
      <!--open-type="getUserInfo"-->
      <!--@getuserinfo="onGetUserInfo"-->
      <!--style="margin: 15rpx;"-->
    <!--&gt;微信登录-->
    <!--</van-button>-->
    
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast";
  
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
        wx.showLoading({
          title: '登录中...'
        })
        this.$http.post('/auth/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          wx.setStorageSync('token', response.access_token)
          wx.switchTab({ url: '/pages/tests/main' })
          wx.hideLoading()
        }).catch((err) => {
          console.log(err)
          wx.hideLoading()
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

</style>
