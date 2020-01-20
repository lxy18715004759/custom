
<template>
  <div class="login">
    <img class="ship" src="./image/ship.svg" alt />
    <Wave></Wave>
    <!-- <canvas id="login"></canvas> -->
    <div class="content" ref="login">
      <h1>进出口贸易协同系统</h1>
      <el-form :model="form" size="large" :rules="rules" ref="form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" autocomplete @keyup.enter.native="nextFocus('ref-1')">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="opassword">
          <el-input type="password" placeholder="请输入密码" v-model="form.opassword" @keyup.enter.native="nextFocus('ref-2')" ref="ref-1">
            <template slot="prepend">
              <i class="el-icon-key"></i>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="imageCode">
          <el-input placeholder="请输入验证码" v-model="form.imageCode" @keyup.enter.native="checkData()" ref="ref-2">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
            <template slot="append">
              <div class="captcha" @click="refreshCaptcha()">
                <img :src="captcha" alt />
              </div>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="full-width" @click="checkData()" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="footer">
      <div class="tip">推荐使用谷歌浏览器使用本系统</div>
      <div class="copyright">Copyright 2019-2022 zjxianlin.com 版权所有 浙ICP备19032183号</div>
    </div>
  </div>
</template>

<script>
import { getCodeImage, login } from "@/api"
import { setToken, setRefreshToken } from "@/utils/token"
import Wave from "./components/Wave"
import vanilla from "vanilla-tilt"
import API_HOST from "@/api/host"
import uuid from "uuid"
import md5 from "md5"
export default {
  components: {
    Wave
  },
  data() {
    return {
      imgCode: "",
      loading: false,
      form: {
        imageCode: "",
        imageId: uuid(),
        opassword: "liting1994",
        username: "liting"
      },
      rules: {
        username: [{ required: true, message: "请填写账号", trigger: "blur" }],
        opassword: [{ required: true, message: "请填写密码", trigger: "blur" }],
        imageCode: [{ required: true, message: "请填写验证码", trigger: "blur" }]
      }
    }
  },
  computed: {
    // 图形验证码地址
    captcha() {
      return `${API_HOST}/code/image?imageId=${this.form.imageId}`
    }
  },
  mounted() {
    this.init3d()
  },

  methods: {
    init3d() {
      vanilla.init(this.$refs.login, {
        max: 15,
        speed: 400,
        scale: 1.07
      })
    },
    // 刷新图形验证码
    refreshCaptcha() {
      this.form.imageId = uuid()
    },

    login() {
      this.loading = true
      let { appId, appPassword, clientKey, clientSecret } = this.GLOBAL
      let { imageCode, imageId, username } = this.form
      let params = {
        appId,
        appPassword,
        clientKey,
        clientSecret,
        imageCode,
        imageId,
        username,
        password: md5(this.form.opassword)
      }
      login(params)
        .then(res => {
          this.loading = false
          console.log(res)
          setToken(res.value, res.expiration)
          setRefreshToken(res.refreshToken.value)
          localStorage.setItem("userId", res.additionalInformation.id)
          this.$router.replace("/daily/order/list")
          this.$notify.success({
            title: "登录成功！",
            message: "欢迎使用"
          })
        })
        .catch(err => {
          this.loading = false
        })
    },

    // 表单校验
    checkData() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.login()
        }
      })
    },

    nextFocus(ref) {
      this.$refs[ref].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  font-weight: 400;
  height: 100%;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

.ship {
  position: absolute;
  z-index: 1;
  left: 100px;
  bottom: 109px;
  width: 500px;
  opacity: 0.7;
  transform: rotate(-2deg);
}

.content {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: inset 0px 0px 10px 0px rgba(74, 137, 246, 0.8);
  position: relative;
  width: 360px;
  transition: all 0.5s;
  z-index: 2;
  transform-style: preserve-3d;
  transform: perspective(1000px);

  /deep/.el-form {
    .el-form-item {
      transform: translateZ(50px);
    }
    .el-input-group__append {
      padding: 1px;
      width: 80px;
      height: 40px;
      .captcha {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .el-input-group__prepend {
      font-size: 18px;
      color: #fff;
      background: rgba(3, 49, 93, 0.5);
    }

    .el-input__inner {
      color: #fff;
      background: rgba(3, 49, 93, 0.5);
    }
  }

  button {
    margin-top: 10px;
    font-size: 18px;
  }
}
form {
  display: block;
  margin: auto;
  padding: 27px 0 20px;
  width: 85%;
}
h1 {
  position: absolute;
  width: 100%;
  font-size: 36px;
  text-align: center;
  top: -70px;
  color: #409eff;
  transform: translateZ(25px);
  text-shadow: 4px 4px 2px #05040a;
}

.footer {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 20px;
  text-align: center;
  color: #d5d5d5;
}
.tip {
  margin-bottom: 8px;
}
</style>
