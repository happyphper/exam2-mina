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
    
    <div class="button">
      <van-button
        size="large"
        type="primary"
        :block="true"
        @click="onSubmit"
      >登录
      </van-button>
    </div>
    
    <!--<van-button-->
      <!--size="large"-->
      <!--type="primary"-->
      <!--:block="true"-->
      <!--open-type="getUserInfo"-->
      <!--@getuserinfo="onGetUserInfo"-->
      <!--style="margin: 15rpx;"-->
    <!--&gt;微信登录-->
    <!--</van-button>-->
    
    <van-toast id="login-toast"/>
    <van-notify id="login-error-notify" />
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
  .button {
    width: 90%;
    margin: 0 auto;
  }
</style>
