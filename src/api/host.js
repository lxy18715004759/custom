// 接口域名切换
let API_HOST

switch (process.env.VUE_APP_ENV) {
  // 生产环境
  case 'master':
    API_HOST = 'http://39.100.94.39:8094'
    break
  // 测试环境
  case 'test':
    API_HOST = 'http://39.100.94.39:8094'
    break
  // 本地环境
  default:
    API_HOST = 'http://39.100.94.39:8094'
    break
}

export default API_HOST
