import axios from 'axios'
import API_HOST from './host'
import Qs from 'qs'
import router from "@/router";
import { Message } from 'element-ui'

import {
  setToken,
  setRefreshToken,
  getToken,
  getRefreshToken,
  getTokenExpire,
  removeToken
} from "@/utils/token"

const instance = axios.create({
  baseURL: API_HOST,
  // withCredentials: true,
  timeout: 1000 * 12,
  transformRequest: [
    (data, config) => {
      let type = config["Content-Type"]
      if (type == "application/json") {
        return JSON.stringify(data)
      } else if (type == "multipart/form-data") {
        return data
      } else {
        return Qs.stringify(data)
      }
    }
  ]
})

// 是否正在刷新refreshToken
let isRefreshing = false

// 被挂起的请求数组
let retryRequestList = []

// token是否过期
function isTokenExpired(expiredTime) {
  if (expiredTime) {
    let nowTime = Date.now()
    let willExpired = (expiredTime - nowTime) < 60 * 1000 * 10
    return willExpired
  }
  return false
}

// 重新登录
function redirectLogin() {
  Message.error("登录已过期，请重新登录")
  retryRequestList = []
  removeToken()
  router.replace("/login")
}

// 刷新token接口
function refreshToken() {
  return axios.get(`${API_HOST}/token/refreshToken?refreshToken=${getRefreshToken()}`)
}

// 接口白名单 不需要校验token
function isWitelist(url) {
  const whiteList = ["/authentication/form"]
  url = url.replace(API_HOST, "")
  return whiteList.includes(url)
}


// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    if (isWitelist(config.url)) {
      return config
    }
    // token存在
    if (getToken()) {
      // 判断token是否过期或 即将过期
      if (isTokenExpired(getTokenExpire())) {
        // 已过期 判断是否正在请求刷新token
        if (!isRefreshing) {
          isRefreshing = true
          // 发起请求 获取新token
          refreshToken().then(res => {
            let { code, data } = res.data
            if (code == 200) {
              setToken(data.access_token, Date.now() + data.expires_in * 1000)
              setRefreshToken(data.refresh_token)
              retryRequestList.map(cb => cb(getToken()))
            } else {
              redirectLogin()
            }
          }).catch(err => {
            redirectLogin()
          }).finally(() => {
            isRefreshing = false
          })
        }
        // 将所有请求放入队列，等token刷新后执行
        return new Promise((resolve, reject) => {
          retryRequestList.push(newToken => {
            config.headers.Authorization = newToken
            resolve(config)
          })
        })
      } else {
        config.headers.Authorization = getToken()
        return config
      }
    } else {
      // token不存在 跳登录
      redirectLogin()
    }
    return config
  },
  error => Promise.error(error)
)

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应成功
  res => {
    let { code, data, msg } = res.data

    if (code == 200) {
      return data
    } else {
      if (code == 4001) {
        // token过期
        redirectLogin()

      } else if (code == 4002) {
        // refreshToken过期
        redirectLogin()
      } else {
        if (msg) {
          Message.error(msg)
        }
      }
      return Promise.reject(res.data)
    }
  },
  error => {
    const { response } = error;
    if (response) {
      // 收到响应，但是不在2xx的范围
      return Promise.reject(response);
    } else {
      // 请求超时或断网时
      Message.error("请检查网络连接！");
    }
  }
)

export default instance