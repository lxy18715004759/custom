<template>
  <el-form :model="form" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名">
          <el-input v-model="form.nickName" placeholder="姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="key" v-for="(val, key) in DICT.gender" :key="key">{{val}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="账号角色">
          <el-select v-model="form.roleIds" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6" v-if="mode == 'add'">
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber" placeholder="手机号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="备注">
          <el-input v-model="form.description" placeholder="备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" :loading="buttonLoading" @click="saveForm()">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import { addUser, updateEmployee, getEmployee } from "@/api"
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        changePassword: 0,
        description: "",
        email: "",
        expireTime: 0,
        headUrl: "",
        nickName: "",
        password: "",
        passwordExpireTime: 0,
        phoneNumber: "",
        sex: "1",
        username: "",
        roleIds: []
      },
      buttonLoading: false,
      customerKeyword: ""
    }
  },
  props: {
    mode: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState("user", ["companyCode"]),
    ...mapState("dict", ["roles"])
  },
  created() {
    this.getAllRole()
    if (this.mode == "detail") {
      this.getEmployee()
    }
    if (this.$route.query.copyFrom) {
      this.getCopyUser(this.$route.query.copyFrom)
    }
  },
  methods: {
    ...mapActions("dict", ["getAllRole"]),
    addUser() {
      let params = [
        {
          ...this.form,
          appId: this.GLOBAL.appId,
          companyCode: this.companyCode
        }
      ]
      this.buttonLoading = true
      addUser(params)
        .then(res => {
          this.buttonLoading = false
          this.form.id = res[0].id

          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          })
        })
        .catch(err => {
          this.buttonLoading = false
        })
    },
    updateEmployee() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode
      }
      this.buttonLoading = true
      updateEmployee(params)
        .then(res => {
          this.buttonLoading = false
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          })
        })
        .catch(err => {
          this.buttonLoading = false
        })
    },
    getEmployee() {
      let params = {
        id: this.$route.params.id
      }
      getEmployee(params).then(res => {
        this.form = res
      })
    },

    // 获取复制商品基本信息
    getCopyUser(id) {
      let params = {
        id
      }
      getEmployee(params).then(res => {
        delete res.id
        this.form = res
      })
    },
    saveForm() {
      if (this.form.id) {
        this.updateEmployee()
      } else {
        this.addUser()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-select {
    width: 100%;
  }
  /deep/.el-input-group__append {
    .el-input {
      width: 70px;
    }
  }
}
</style>