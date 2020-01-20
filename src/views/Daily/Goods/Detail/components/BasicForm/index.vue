<template>
  <el-form :model="form" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="产品编号">
          <el-input v-model="form.productCode" placeholder="产品编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客户代码">
          <el-select filterable :filter-method="customerCodeFilter" clearable default-first-option v-model="form.customerCode" placeholder="请选择客户代码">
            <el-option class="custom-select-select" :label="item.chineseName" :value="item.customerCode" v-for="(item, index) in customerCodeList" :key="item.customerCode">
              <span class="custom-select-name">{{item.chineseName}}</span>
              <span class="custom-select-code">{{item.customerCode}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="最小包装">
          <el-input v-model="form.minBoxUnit" placeholder="最小包装单位"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="中文品名">
          <el-input v-model="form.chineseName" placeholder="中文品名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="英文品名">
          <el-input v-model="form.englishName" placeholder="英文品名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="毛重">
          <el-input placeholder="请输入内容" v-model="form.grossNumber">
            <el-select v-model="form.grossUnit" slot="append" placeholder="请选择">
              <el-option label="g" value="g"></el-option>
              <el-option label="kg" value="kg"></el-option>
              <el-option label="t" value="t"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="净重">
          <el-input placeholder="请输入内容" v-model="form.netNumber">
            <el-select v-model="form.netUnit" slot="append" placeholder="请选择">
              <el-option label="g" value="g"></el-option>
              <el-option label="kg" value="kg"></el-option>
              <el-option label="t" value="t"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="长">
          <el-input placeholder="请输入内容" v-model="form.lengthNumber">
            <el-select v-model="form.lengthUnit" slot="append" placeholder="请选择">
              <el-option label="mm" value="mm"></el-option>
              <el-option label="cm" value="cm"></el-option>
              <el-option label="m" value="m"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="宽">
          <el-input placeholder="请输入内容" v-model="form.widthNumber">
            <el-select v-model="form.widthUnit" slot="append" placeholder="请选择">
              <el-option label="mm" value="mm"></el-option>
              <el-option label="cm" value="cm"></el-option>
              <el-option label="m" value="m"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="高">
          <el-input placeholder="请输入内容" v-model="form.heightNumber">
            <el-select v-model="form.heightUnit" slot="append" placeholder="请选择">
              <el-option label="mm" value="mm"></el-option>
              <el-option label="cm" value="cm"></el-option>
              <el-option label="m" value="m"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="体积">
          <el-input v-model="form.volume" placeholder="体积"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="规格">
          <el-input v-model="form.format" placeholder="规格"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="重/泡货">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="重货" value="重货"></el-option>
            <el-option label="泡货" value="泡货"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="唛头">
          <el-input v-model="form.mark" placeholder="唛头"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" :loading="buttonLoading" @click="saveForm()">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import { addProduct, updateProduct, getProduct } from "@/api"
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        chineseName: "",
        customerCode: "",
        englishName: "",
        format: "",
        grossNumber: "",
        grossUnit: "kg",
        heightNumber: "",
        heightUnit: "mm",
        lengthNumber: "",
        lengthUnit: "mm",
        mark: "",
        minBoxUnit: "",
        netNumber: "",
        netUnit: "kg",
        productCode: "",
        remark: "",
        type: "正常",
        volume: "",
        widthNumber: "",
        widthUnit: "mm"
      },
      buttonLoading: false,
      customerKeyword: ""
    }
  },
  props: {
    productId: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters("dict", ["customerCode"]),
    customerCodeList() {
      return this.customerCode(this.customerKeyword)
    }
  },
  created() {
    this.getSimpleCustomerRo()
    if (this.mode == "detail") {
      this.getProduct()
    }
    if (this.$route.query.copyFrom) {
      this.getCopyProduct(this.$route.query.copyFrom)
    }
  },
  methods: {
    ...mapActions("dict", ["getSimpleCustomerRo"]),
    addProduct() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId
      }
      this.buttonLoading = true
      addProduct(params)
        .then(res => {
          this.buttonLoading = false
          this.form.id = res.id
          this.$emit("update:productId", res.id)
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
    updateProduct() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId
      }
      this.buttonLoading = true
      updateProduct(params)
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
    getProduct() {
      let params = {
        id: this.productId
      }
      getProduct(params).then(res => {
        this.form = res
      })
    },

    // 获取复制商品基本信息
    getCopyProduct(id) {
      let params = {
        id
      }
      getProduct(params).then(res => {
        delete res.id
        this.form = res
      })
    },
    saveForm() {
      if (this.form.id) {
        this.updateProduct()
      } else {
        this.addProduct()
      }
    },
    customerCodeFilter(e) {
      this.customerKeyword = e
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