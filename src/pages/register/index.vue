<template>
  <div class="container">
    <p class="tips">首次登录，需要与考评系统中的账户的绑定</p>
    <div class="form-container">
      <div class="form-item">
        <input placeholder="请输入手机或学号" type="text" v-model="form.username">
      </div>
      <div class="form-item">
        <button :loading="loading" @click="onSubmit" hover-class="button-hover" type="default">绑定</button>
      </div>
    </div>
    <van-notify id="wechat-register-notify"/>
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";

export default {
  data() {
    return {
      form: {
        username: ""
      },
      loading: false
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.username) {
        Notify({
          text: "手机或学号必填",
          duration: 1000,
          selector: "#wechat-register-notify",
          backgroundColor: "#D65048"
        });
      }

      // this.loading = true;

      wx.login({
        success: res => {
          this.$http
            .post("/wechat/register", {
              code: res.code,
              username: this.form.username
            })
            .then((response) => {
              wx.setStorageSync("token", response);
              return this.$http.get("/auth/me", { include: "classroom" });
            }).then(response => {
              console.log(response)
              wx.setStorageSync("user", response);
              wx.switchTab({ url: "/pages/home/main" });
            }).catch(err => {
              console.log(err)
              this.loading = false;
              if (!err.response) {
                Notify({
                  text: "未知错误",
                  duration: 3000,
                  selector: "#wechat-register-notify",
                  backgroundColor: "#D65048"
                });
              } else {
                Notify({
                  text: err.response.data.message,
                  duration: 3000,
                  selector: "#wechat-register-notify",
                  backgroundColor: "#D65048"
                });
              }
            });
        }
      });
    }
  }
};
</script>

<style>
.tips {
  font-size:28rpx;
  padding:.5rem;
  color:#ccc;
}
.form-item {
  margin-bottom: 20rpx;
  text-align: left;
  font-size: 26rpx;
}
input {
  background-color: #ffffff;
  width: 80%;
  margin: 0 auto;
  padding: 15rpx;
  border-radius: 98rpx;
  color: #000000;
}

button {
  width: 80%;
  margin-top: 20rpx;
  background-color: #d5d0dd;
  color: #5f4c7e;
  border-radius: 98rpx;
}

button:after {
  border-radius: 98rpx;
}

.button-hover {
  background-color: #f7c443;
}
</style>
