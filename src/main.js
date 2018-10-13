import Vue from "vue";
import App from "./App";

var Fly = require("flyio/dist/npm/wx");

var fly = new Fly;

const baseURL = process.env.API_BASE_URL;

fly.config.baseURL = baseURL;

fly.interceptors.request.use((config, promise) => {
  const token = wx.getStorageSync("token");
  //给所有请求添加自定义header
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data;
  },
  (err) => {
    // 发生网络错误后会走到这里
    if (err.response.status === 422) {
      const values = Object.values(err.response.data.errors);
      wx.showToast({
        title: values.join(";"),
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: err.response.data.message,
        icon: 'none'
      });
    }
    return Promise.reject(err);
  }
);

Vue.prototype.$http = fly;

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);

app.$mount();
