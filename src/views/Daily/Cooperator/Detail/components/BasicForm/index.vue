<template>
  <el-form :model="form" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="单位代码">
          <el-input v-model="form.code" placeholder="单位代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位名称">
          <el-input v-model="form.chineseName" placeholder="单位名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="单位简称">
          <el-input v-model="form.simpleName" placeholder="单位简称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="单位类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="key" v-for="(val, key) in DICT.cooperatorType" :key="key">{{val}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" :loading="buttonLoading" @click="saveForm()">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import { addContactCompany, updateContactCompany, getContactCompany } from "@/api"
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        code: "",
        chineseName: "",
        simpleName: "",
        type: ""
      },
      buttonLoading: false,
      customerKeyword: ""
    }
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: ""
    },
    companyName: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState("user", ["companyCode"])
  },
  created() {
    if (this.mode == "detail") {
      this.getContactCompany()
    }
    if (this.$route.query.copyFrom) {
      this.getCopyProduct(this.$route.query.copyFrom)
    }
  },
  methods: {
    addContactCompany() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode
      }
      this.buttonLoading = true
      addContactCompany(params)
        .then(res => {
          this.buttonLoading = false
          this.form.id = res.id
          this.$emit("update:id", res.id)
          this.$emit("update:companyName", res.chineseName)

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
    updateContactCompany() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode
      }
      this.buttonLoading = true
      updateContactCompany(params)
        .then(res => {
          this.buttonLoading = false
          this.$emit("update:companyName", res.chineseName)
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
    getContactCompany() {
      let params = {
        id: this.id
      }
      getContactCompany(params).then(res => {
        this.form = res
        this.$emit("update:companyName", res.chineseName)
      })
    },

    // 获取复制商品基本信息
    getCopyProduct(id) {
      let params = {
        id
      }
      getContactCompany(params).then(res => {
        delete res.id
        this.form = res
      })
    },
    saveForm() {
      if (this.form.id) {
        this.updateContactCompany()
      } else {
        this.addContactCompany()
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