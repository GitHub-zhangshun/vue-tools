import axios from "axios";
import env from "@/config/env";
import * as types from "@/store/mutation-types";
import loginStore from "@/store/community/login";
/**
 * 自定义 Axios 实例。
 * @param baseURL 接口地址前缀。 PS. 可以直接填写，也可以在 .env 文件中进行配置。
 * @param timeout 请求超时的时间。
 * @param withCredentials 跨域请求时是否需要使用凭证，默认 false 。
 */
const AJAX = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  withCredentials: env.credential
});
// 添加请求拦截器。
AJAX.interceptors.request.use(
  function(config) {
    if (loginStore.state.token) {
      // 判断是否存在 token，如果存在的话，则每个 http header 都加上 token 。
      config.headers.Authorization = `${loginStore.state.token}`;
    }
    return config;
  },
  function(error) {
    // 对请求错误的操作。
    return Promise.reject(error);
  }
);
// 添加响应拦截器。
AJAX.interceptors.response.use(
  // 例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页。
  function(response) {
    // 对响应数据的操作。
    return response.data;
  },
  function(error) {
    // 对请求响应错误的操作。
    if (error && error.response) {
      // 返回状态码为 401，表示未授权，清除 token 信息并跳转到社区主页。
      switch (error.response.code) {
        case 401:
          store.commit(types.USER_LOG_OUT);
          window.location.href = 'https://m-test.sisilily.com/account/login.html';
      }
    }
    return Promise.reject(error);
  }
);
// 定义对外的各种形式的请求。
export default {
  get(url, param = {}, headers = {}) {
    return AJAX.get(url, {
      params: param,
      headers
    });
  },
  post(url, param = null, headers = {}) {
    return AJAX.post(url, param, {
      headers
    });
  },
  put(url, param = null, headers = {}) {
    return AJAX.put(url, param, {
      headers
    });
  },
  file(url, param = null, headers = {}) {
    return AJAX.post(url, param, {
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  },
  delete(url, param = null, headers = {}) {
    return AJAX.delete(url, {
      param,
      headers: Object.assign(
        {
          "Content-Type": "multipart/form-data"
        },
        headers
      )
    });
  }
};
