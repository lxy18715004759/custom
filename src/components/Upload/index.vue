<template>
  <div class="upload">
    <!-- <div class="text">
      <i class="el-icon-upload"></i>
      <p>点击上传</p>
    </div>-->
    <el-button type="primary" @click="handelClick()" icon="el-icon-upload">点击上传</el-button>
    <input class="input" type="file" ref="input" multiple @change="fileInput" />
  </div>
</template>

<script>
import md5 from "md5"
import * as qiniu from "qiniu-js"
import { getQiNiuToken } from "@/api"
import API_HOST from "@/api/host"
export default {
  data() {
    return {
      pieces: 0, //选择图片数量
      successNum: 0
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return { callbackUrl: "", params: {} }
      }
    }
  },
  computed: {
    callbackBody() {
      let { params } = this.options
      let str = "key=$(key)&appId=$(x:appId)"
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          str += `&${key}=$(x:${key})`
        }
      }
      return str
    },
    params() {
      let { params } = this.options
      let o = {}
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          let xkey = `x:${key}`
          o[xkey] = params[key]
        }
      }
      return o
    }
  },
  mounted() {
    // this.getQiNiuToken()
  },
  methods: {
    handelClick() {
      this.$refs.input.click()
    },

    fileInput(e) {
      let files = e.target.files
      this.pieces = files.length
      files.forEach(element => {
        this.upload(element)
      })
    },
    getQiNiuToken() {
      let params = {
        appId: this.GLOBAL.appId,
        callbackBody: this.callbackBody,
        callbackBodyType: "application/x-www-form-urlencoded",
        callbackUrl: `${API_HOST}${this.options.callbackUrl}`,
        expireSeconds: 60
      }
      return new Promise(resolve => {
        getQiNiuToken(params).then(res => {
          resolve(res.token)
        })
      })
    },

    async upload(file) {
      let key = md5(file.name) // 文件资源名
      let token = await this.getQiNiuToken()

      let config = {
        useCdnDomain: true,
        region: qiniu.region.z0
      }

      let putExtra = {
        fname: file.name,
        params: {
          "x:appId": this.GLOBAL.appId,
          ...this.params
        },
        mimeType: ["image/png", "image/jpeg", "image/gif"]
      }
      let observe = {
        next: res => {
          console.log("已上传大小，单位为字节：" + res.total.loaded)
          console.log("本次上传的总量控制信息，单位为字节：" + res.total.size)
          console.log("当前上传进度，范围：0～100：" + res.total.percent)
        },
        error: err => {
          console.log(err)
        },
        complete: res => {
          //完成后的操作
          this.successNum++
          if (this.successNum == this.pieces) {
            this.$notify({
              title: "成功",
              message: "上传成功",
              type: "success"
            })
          }
          this.$emit("done", res.data)
        }
      }
      let observable = qiniu.upload(file, key, token, putExtra, config)
      let subscription = observable.subscribe(observe)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  // width: 100px;
  // height: 100px;
  // border: 1px dashed #409fff;
  // border-radius: 5px;
  // position: relative;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  text-align: center;

  .input {
    // position: absolute;
    // left: 0;
    // top: 0;
    display: none;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  // .text {
  //   text-align: center;
  //   i {
  //     font-size: 20px;
  //     color: #409fff;
  //   }
  // }
}
</style>