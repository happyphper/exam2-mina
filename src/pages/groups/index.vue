<template>
  <div>
    <van-cell-group custom-class="margin-top" v-for="group in tableData" :key="group.id">
      <van-cell :title="group.name" icon="points-mall" :border="true" is-link
                :url="'/pages/groupMembers/main?groupId=' + group.id"/>
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          { id: 1, name: "旅游管理1101" },
          { id: 2, name: "旅游管理1102" }
        ]
      };
    },
    methods: {}
  };
</script>

<style>
  .margin-top {
    margin-top: 30 rpx;
  }
</style>
