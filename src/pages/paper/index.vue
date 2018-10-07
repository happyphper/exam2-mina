<template>
  <div>
    <van-panel
      :title="question.title"
      :desc="question.type"
      :status="question.status"
      use-footer-slot>
      <view>
        <van-button
          style="margin: 5rpx;"
          :block="true"
          size="large"
          v-for="option in question.options" :key="option.id"
          @click="onSubmit(question.id, option.id)"
        >{{ option.content }}
        </van-button>
      </view>
    </van-panel>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '@/../static/vant/toast/toast'
  
  export default {
    data() {
      return {
        key: 0,
        tableData: [
          {
            id: 1,
            title: "1 + 1 = ？",
            type: "single",
            options: [
              { id: 1, content: "1" },
              { id: 2, content: "2" },
              { id: 3, content: "3" },
              { id: 4, content: "4" }
            ],
            status: null
          },
          {
            id: 2,
            title: "问世间情为何物，直教人生死相许，这一首诗出自哪一位名家之手？",
            type: "single",
            options: [
              { id: 1, content: "杜甫" },
              { id: 2, content: "李白" },
              { id: 3, content: "李贺" },
              { id: 4, content: "杜牧" }
            ],
            status: null
          },
        ]
      };
    },
    computed: {
      question() {
        return this.tableData[this.key];
      }
    },
    methods: {
      onSubmit(questionId, optionId) {
        Toast.loading({
          mask: true,
          message: '判卷中...'
        })
        this.key = this.key + 1
        if (this.tableData.length === this.key) {
          Toast.loading({
            mask: true,
            message: '答题完成，正在读取'
          })
        } else {
        
        }
        console.log(questionId, optionId);
      }
    }
  };
</script>

<style>

</style>
