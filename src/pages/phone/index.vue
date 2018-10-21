<template>
  <div class="container">
    <div class="form-container">
      <div class="form-item">
        <input type="text" v-if="phone" :value="phone" :disabled="phone">
        <input type="text" v-else v-model="form.phone" placeholder="请输入手机">
      </div>
      <div class="form-item">
        <button type="default" :loading="loading" hover-class="button-hover" @click="onSubmit" :disabled="phone">{{ phone ? '已经绑定': '确认' }}</button>
      </div>
    </div>
    <van-notify id="phone-notify" />
  </div>
</template>

<script>
  import Notify from '@/../static/vant/notify/notify';
  
  export default {
    data() {
      return {
        form: {
          phone: ""
        },
        loading: false
      };
    },
    computed: {
      phone() {
        const user = wx.getStorageSync('user')
        return user.phone
      }
    },
    methods: {
      onSubmit() {
        if (!this.form.phone) {
          Notify({
            text: '手机必填',
            duration: 1000,
            selector: '#phone-notify',
            backgroundColor: '#D65048'
          });
        }
        this.loading = true
        this.$http.put('/phone', this.form).then(() => {
          return this.$http.get('/auth/me', { include: 'group' })
        }).then(response => {
          wx.setStorageSync('user', response)
          Notify({
            text: '绑定成功',
            duration: 1000,
            selector: '#phone-notify',
            backgroundColor: '#60C655'
          });
          wx.switchTab({ url: '/pages/me/main' })
        }).catch(err => {
          this.loading = false
          if (!err.response) {
            Notify({
              text: '未知错误',
              duration: 1000,
              selector: '#phone-notify',
              backgroundColor: '#D65048'
            });
          } else if (err.response.status === 422) {
            const messgae = Object.values(err.response.data.errors).join(';')
            Notify({
              text: messgae,
              duration: 1000,
              selector: '#phone-notify',
              backgroundColor: '#D65048'
            });
          } else {
            Notify({
              text: err.response.data.message,
              duration: 1000,
              selector: '#phone-notify',
              backgroundColor: '#D65048'
            });
          }
        })
      }
    }
  };
</script>

<style>
  .form-item {
    margin-bottom: 20rpx;
    text-align: left;
    font-size: 26rpx;
  }
  input {
    background-color: #FFFFFF;
    width: 80%;
    margin: 0 auto;
    padding: 15rpx;
    border-radius: 98rpx;
    color: #000000;
  }
  
  button {
    width: 80%;
    margin-top: 20rpx;
    background-color: #D5D0DD;
    color: #5F4C7E;
    border-radius: 98rpx;
  }
  
  button:after {
    border-radius: 98rpx;
  }
  
  .button-hover {
    background-color: #F7C443;
  }
</style>
