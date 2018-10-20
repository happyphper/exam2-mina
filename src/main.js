import Vue from "vue";
import App from "./App";

var Fly = require("flyio/dist/npm/wx");

var fly = new Fly;

const baseURL = process.env.API_BASE_URL;

fly.config.baseURL = baseURL;

fly.interceptors.request.use((config, promise) => {
  const token = wx.getStorageSync('token');
  if (!token) {
    wx.redirectTo({ url: '/pages/home/main' })
  }
  //给所有请求添加自定义header
  config.headers["Authorization"] = "Bearer " + token.access_token;
  return config;
});

fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Vue.prototype.$http = fly;

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);

app.$mount();
