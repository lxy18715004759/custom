import md5 from "md5"
import * as qiniu from 'qiniu-js'
let file = ""; // 对象，上传的文件
let key = md5("123213213"); // 文件资源名
let token = ""
/*
* config.useCdnDomain: 是否使用 cdn 加速域名，true or false，默认为 false。
* config.disableStatisticsReport: 是否禁用日志报告，为布尔值，默认为false。
* config.region: 选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
* config.retryCount: 上传自动重试次数（整体重试次数）；默认3次（即上传失败后最多重试两次）；
* config.concurrentRequestLimit: 分片上传的并发请求量，number，默认为3；
* config.checkByMD5: 是否开启 MD5 校验，在断点续传时校验分片，默认为 false，不开启。
*/
let config = {
  useCdnDomain: true,
  region: qiniu.region.z0
};

/*
* fname: string，文件原文件名.
* params: object，用来放置自定义变量;
* mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；
* 限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
 */
let putExtra = {
  fname: file,
  params: {},
  mimeType: ["image/png", "image/jpeg", "image/gif"]
};
let observe = {
  next(res) {
    console.log('已上传大小，单位为字节：' + res.total.loaded)
    console.log('本次上传的总量控制信息，单位为字节：' + res.total.size)
    console.log('当前上传进度，范围：0～100：' + res.total.percent);
  },
  error(err) {
    console.log(err.code)
    console.log(err.message)
    console.log(err.isRequestError)
    console.log(err.reqId)
  },
  complete(res) {
    //完成后的操作
    //上传成功以后会返回key 和 hash  key就是文件名了！
    console.log(res)
  }
};
//开始上传  token 需要找后端获取(单独的方法)
let observable = qiniu.upload(file, key, token, putExtra, config)
// let subscription = observable.subscribe(observe)

