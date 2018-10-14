<template>
  <div class="app-container padding-top">
    <van-cell-group>
      <van-cell is-link>
        <view slot="title">
          <div class="header-wrapper">
            <image :src="user.avatar || '/static/images/avatar.png'" class="avatar"></image>
            <div class="title">
              <p>{{ user.name }}</p>
              <p>{{ user.student_id }}</p>
            </div>
          </div>
        </view>
      </van-cell>
    </van-cell-group>
  
    <van-cell-group custom-class="margin-top">
      <van-cell v-if="!user || !user.group" title="没有班级" icon="points-mall" :border="true"></van-cell>
      <van-cell v-else :title="user && user.group && user.group.name" icon="points-mall" :border="true" is-link url="/pages/groups/main"/>
    </van-cell-group>
    
    <van-cell-group>
      <van-cell title="考试记录" icon="records" :border="true" is-link  url="/pages/testResults/main"/>
    </van-cell-group>
    
    <van-cell-group>
      <van-cell title="考试排行" icon="wap-nav" :border="true" is-link />
    </van-cell-group>
  
    <van-cell-group custom-class="margin-top">
      <van-cell title="修改密码" icon="setting" :border="true" is-link url="/pages/password/main"/>
    </van-cell-group>
    
    <van-cell-group custom-class="margin-top">
      <van-cell title="退出登录" icon="close" :border="true" @click="handleLogout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  mounted() {
    this.user = wx.getStorageSync('user')
  },
  data() {
    return {
      user: {
        group: {}
      }
    }
  },
  methods: {
    handleLogout() {
      wx.clearStorage()
      wx.redirectTo({ url: '/pages/login/main' })
    }
  }
}
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
