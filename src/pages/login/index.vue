<template>
  <div>
    <div class="container">
      <image src="/static/images/lhdx_logo.png" class="logo"/>
    </div>

    <van-cell-group>
      <van-field
        :value="username"
        required
        clearable
        label="账户"
        icon="question"
        placeholder="请输入用户名/手机/学号"
        @click-icon="onClickIcon"
      />
    
      <van-field
        :value="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :border="true"
      />
    </van-cell-group>
    <van-button size="large" type="primary" @click="onSubmit">登录</van-button>
  
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '@/../static/vant/toast/toast';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      onClickIcon() {
        console.log(1111)
        Toast('初始密码：123456');
      },
      onSubmit() {
        console.log('登录')
      }
    }
  }
</script>
<style scoped>
  .logo {
    width: 400rpx;
    height: 400rpx;
    margin: 30rpx;
  }
</style>
