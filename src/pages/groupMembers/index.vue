<template>
  <div>
    <van-cell-group custom-class="margin-top" v-for="user in tableData" :key="user.id">
      <van-cell>
        <view slot="title">
          <div class="header-wrapper">
            <image src="/static/images/avatar.png" class="avatar"></image>
            <div class="title">
              <p>{{ user.name }}</p>
              <p>学号: {{ user.student_id }}</p>
            </div>
          </div>
        </view>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  onLoad() {
    console.log(this.$root.$mp.query)
  },
  data() {
    return {
      tableData: [
        {id:1, name: '王宝龙', student_id: 110430042},
        {id:2, name: '张三', student_id: 110430043},
        {id:3, name: '李四', student_id: 110430044},
      ]
    }
  },
  methods: {}
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
