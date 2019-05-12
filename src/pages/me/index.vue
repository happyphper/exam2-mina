<template>
  <div class="app-container padding-top">
    <van-cell-group>
      <van-cell is-link>
        <view slot="title">
          <div class="header-wrapper">
            <img :src="avatar" class="avatar">
            <div class="title">
              <p>{{ user.name }}</p>
              <p>{{ user.student_id }}</p>
            </div>
          </div>
        </view>
      </van-cell>
    </van-cell-group>

    <van-cell-group custom-class="margin-top">
      <van-cell :border="true" icon="points-mall" title="没有班级" v-if="!classroom"></van-cell>
      <van-cell
        :border="true"
        :title="classroom.title"
        icon="points-mall"
        is-link
        url="/pages/classmate/main"
        v-else
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell :border="true" icon="records" is-link title="考试记录" url="/pages/result/main"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell :border="true" icon="wap-nav" is-link title="考试排行"/>
    </van-cell-group>

    <van-cell-group custom-class="margin-top">
      <van-cell :border="true" icon="setting" is-link title="修改密码" url="/pages/password/main"/>
    </van-cell-group>

    <van-cell-group custom-class="margin-top">
      <van-cell :border="true" icon="phone" is-link title="我的手机" url="/pages/phone/main"/>
    </van-cell-group>

    <van-cell-group custom-class="margin-top">
      <van-cell :border="true" @click="handleUnbind" icon="warn" is-link title="解除微信绑定"/>
    </van-cell-group>

    <van-cell-group custom-class="margin-top">
      <van-cell :border="true" @click="handleLogout" icon="close" title="退出登录"/>
    </van-cell-group>

    <van-toast id="unbind-toast"/>

    <van-notify id="unbind-notify"/>
  </div>
</template>

<script>
import Toast from "@/../static/vant/toast/toast";
import Notify from "@/../static/vant/notify/notify";

export default {
  computed: {
    user() {
      return wx.getStorageSync("user");
    },
    avatar() {
      return this.user.avatar ? this.user.avatar : "/static/images/avatar.png";
    },
    classroom() {
      return this.user.classroom ? this.user.classroom : null;
    }
  },
  methods: {
    handleLogout() {
      wx.clearStorage();
      wx.reLaunch({ url: "/pages/index/main" });
    },
    handleUnbind() {
      const that = this
      wx.showModal({
        title: '确认',
        content: '确定解绑吗？',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '解绑中...',
            })
            that.$http
            .delete("/wechat")
            .then(() => {
              wx.hideLoading()
              wx.clearStorage();
              wx.reLaunch({ url: "/pages/index/main" });
            })
            .catch(err => {
              wx.hideLoading()
              if (!err.response) {
                Notify({
                  text: "未知错误",
                  duration: 3000,
                  selector: "#unbind-notify",
                  backgroundColor: "#D65048"
                });
              } else {
                Notify({
                  text: err.response.message,
                  duration: 3000,
                  selector: "#unbind-notify",
                  backgroundColor: "#D65048"
                });
              }
            });
          }
        }
      })
    }
  }
};
</script>

<style>
.header-wrapper {
  margin: 10rpx 0;
  display: flex;
  align-items: center;
  justify-content: left;
}
.avatar {
  width: 80rpx;
  height: 80rpx;
}
.title {
  margin-left: 30rpx;
}
.margin-top {
  margin-top: 30rpx;
}
.padding-top {
  padding-top: 30rpx;
}
</style>
