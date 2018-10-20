<template>
  <div class="container">
    <div class="form-container">
      <div class="form-item">
        <input type="text" placeholder="请输入手机">
      </div>
      <div class="form-item">
        <button type="default" hover-class="button-hover">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          old_password: "",
          password: "",
          password_confirmation: ""
        }
      };
    },
    methods: {}
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
