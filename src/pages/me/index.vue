<template>
  <div>
    <van-cell-group custom-class="margin-top">
      <van-cell is-link>
        <view slot="title">
          <div class="header-wrapper">
            <image src="/static/images/avatar.png" class="avatar"></image>
            <div class="title">
              <p>王宝龙</p>
              <p>学号: 110430042</p>
            </div>
          </div>
        </view>
      </van-cell>
    </van-cell-group>
  
    <van-cell-group custom-class="margin-top">
      <van-cell title="我的班级" icon="points-mall" :border="true" is-link url="/pages/groups/main"/>
    </van-cell-group>
    
    <van-cell-group>
      <van-cell title="考试记录" icon="records" :border="true" is-link />
    </van-cell-group>
    
    <van-cell-group>
      <van-cell title="考试排行" icon="wap-nav" :border="true" is-link />
    </van-cell-group>
  
    <van-cell-group custom-class="margin-top">
      <van-cell title="手机绑定" icon="phone" :border="true" is-link />
    </van-cell-group>
  
    <van-cell-group custom-class="margin-top">
      <van-cell title="修改密码" icon="setting" :border="true" is-link />
    </van-cell-group>
    
    <van-cell-group custom-class="margin-top">
      <van-cell title="退出登录" icon="close" :border="true" is-link />
    </van-cell-group>
  </div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
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
</style>
