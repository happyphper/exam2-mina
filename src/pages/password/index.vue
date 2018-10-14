<template>
  <div class="app-container">
    <van-cell-group>
      <van-field
        :value="form.old_password"
        type="password"
        required
        clearable
        label="旧密码"
        placeholder="请输入旧密码"
        @input="onInputOldPassword"
      />
      
      <van-field
        :value="form.password"
        type="password"
        label="密码"
        placeholder="请输入新密码"
        clearable
        required
        :border="true"
        @input="onInputPassword"
      />
      <van-field
        :value="form.password_confirmation"
        type="password"
        label="密码"
        placeholder="确认密码"
        clearable
        required
        :border="true"
        @input="onInputPasswordConfirmation"
      />
    </van-cell-group>
    
    <div class="button">
      <van-button
        size="large"
        type="primary"
        :block="true"
        @click="onSubmit"
      >修改
      </van-button>
    </div>
    
    <van-toast id="password-toast"/>
    <van-notify id="password-error-notify" />
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast";
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    data() {
      return {
        form: {
          old_password: '',
          password: '',
          password_confirmation: '',
        }
      };
    },
    methods: {
      onSubmit() {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '提交',
          loadingType: 'spinner',
          selector: '#password-toast',
        });
        this.$http.put('/password', this.form).then(() => {
          Toast.clear()
          Notify({
            text: '修改成功',
            duration: 1500,
            selector: '#password-error-notify',
            backgroundColor: '#00C853'
          });
          this.form.old_password = null
          this.form.password = null
          this.form.password_confirmation = null
          wx.clearStorage()
          setTimeout(() => {
            wx.switchTab({ url: '/pages/index/main' })
          }, 500)
        }).catch(err => {
          Toast.clear()
          if (err.response.status === 422) {
            const values = Object.values(err.response.data.errors);
            Notify({
              text: values.join(';'),
              duration: 1500,
              selector: '#password-error-notify',
              backgroundColor: '#CB4B45'
            });
          } else {
            Notify({
              text: err.response.data.message || '错误',
              duration: 1500,
              selector: '#password-error-notify',
              backgroundColor: '#CB4B45'
            });
          }
        })
      },
      onInputOldPassword(event) {
        this.form.old_password = event.mp.detail
      },
      onInputPassword(event) {
        this.form.password = event.mp.detail
      },
      onInputPasswordConfirmation(event) {
        this.form.password_confirmation = event.mp.detail
      },
    }
  };
</script>

<style>
  .title {
    text-align: center;
    color: #424A60;
  }
  
  .text {
    font-size: 20 rpx;
  }
  
  .test-container {
    margin: 0 10 rpx 10 rpx 10 rpx;
    border: 1 rpx solid #ccc;
    border-radius: 5 rpx;
    box-shadow: 5 rpx 5 rpx 5 rpx #888888;
  }
</style>
