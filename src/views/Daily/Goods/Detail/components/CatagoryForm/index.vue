<template>
  <el-form :model="form" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="海关HS代码">
          <el-select
            v-model="form.customsCode"
            value-key="goodCode"
            @change="codeChange"
            filterable
            remote
            reserve-keyword
            placeholder="请输入代码"
            :remote-method="searchGoodByCode"
            :loading="searchLoading"
          >
            <el-option class="custom-select-select" :label="item.goodCode" :value="item" v-for="(item, index) in codeList" :key="item.goodCode">
              <span class="custom-select-name">{{item.goodName}}</span>
              <span class="custom-select-code">{{item.goodCode}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="商品名称">
          <el-input v-model="form.goodName" placeholder="商品名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="申报要素">
          <el-input v-model="form.declareKey" :disabled="!form.goodId" @focus="showElementModal()" placeholder="申报要素"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="申报计量单位">
          <el-input placeholder="请输入数量" v-model="form.declareNumber">
            <el-select filterable clearable default-first-option :filter-method="unitCodeFilter" v-model="form.declareUnit" slot="append" placeholder="输入单位">
              <el-option class="custom-select-select" :label="item.name" :value="item.code" v-for="(item, index) in unitCode(unitCodeKeyword)" :key="item.code">
                <span class="custom-select-name">{{item.name}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法定单位">
          <el-input placeholder="请输入数量" v-model="form.legalNumber">
            <template slot="append">{{unitCodeMatchByCode(form.legalUnit)}}</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="第二单位">
          <el-input placeholder="请输入数量" v-model="form.secondNumber" :disabled="!unitCodeMatchByCode(form.secondUnit)">
            <template slot="append">{{unitCodeMatchByCode(form.secondUnit)}}</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" :loading="buttonLoading" @click="saveForm()">保存</el-button>
    </div>

    <el-dialog title="申报要素" :visible.sync="dialogVisible">
      <el-form label-width="100px">
        <el-form-item :label="item.key" v-for="(item, index) in elementsFormList" :key="index">
          <el-input v-model="elements[index]" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveElements()">确 定</el-button>
      </div>
    </el-dialog>
  </el-form>
</template>

<script>
import { addProductClassify, updateProductClassify, getProductClassify, searchGoodByCode, queryGoodKeyByGoodId } from "@/api"
import { mapGetters, mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        customsCode: "",
        declareKey: "",
        declareNumber: "",
        declareUnit: "",
        goodName: "",
        legalNumber: "",
        legalUnit: "",
        productId: "",
        secondNumber: "",
        secondUnit: "",
        goodId: ""
      },
      buttonLoading: false,
      dialogVisible: false,
      elements: [],
      elementsFormList: [],
      searchLoading: false,
      codeList: [],
      currentCodeItem: {},
      unitCodeKeyword: ""
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
    ...mapGetters("dict", ["unitCode", "unitCodeMatchByCode"])
  },
  created() {
    this.getAllUnitCode()
    if (this.mode == "detail") {
      this.getProductClassify()
    }
    if (this.$route.query.copyFrom) {
      this.getCopyProductClassify(this.$route.query.copyFrom)
    }
  },
  methods: {
    ...mapActions("dict", ["getAllUnitCode"]),
    addProductClassify() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        productId: this.productId
      }
      this.buttonLoading = true
      addProductClassify(params)
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
    updateProductClassify() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        productId: this.productId
      }
      this.buttonLoading = true
      updateProductClassify(params)
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
    getProductClassify() {
      let params = {
        productId: this.productId
      }
      getProductClassify(params).then(res => {
        this.form = res
      })
    },

    // 获取复制商品基本信息
    getCopyProductClassify(id) {
      let params = {
        productId: id
      }
      getProductClassify(params).then(res => {
        delete res.id
        this.form = res
      })
    },

    codeChange(item) {
      this.currentCodeItem = item
      this.form.customsCode = item.goodCode
      this.form.goodId = item.id
      this.form.goodName = item.goodName
      this.form.legalUnit = item.legalUnitCode
      this.form.secondUnit = item.secondUnitCode
    },

    searchGoodByCode(keywords) {
      let params = {
        appId: this.GLOBAL.appId,
        keywords
      }
      searchGoodByCode(params).then(res => {
        this.codeList = res
      })
    },

    queryGoodKeyByGoodId() {
      let params = {
        goodId: this.form.goodId
      }
      queryGoodKeyByGoodId(params).then(res => {
        this.elementsFormList = res
      })
    },

    showElementModal() {
      this.queryGoodKeyByGoodId()
      this.setElementValue()
      this.dialogVisible = true
    },

    saveElements() {
      this.form.declareKey = this.elements.join("|")
      this.dialogVisible = false
    },

    setElementValue() {
      this.elements = this.form.declareKey.split("|")
    },

    unitCodeFilter(e) {
      this.unitCodeKeyword = e
    },

    saveForm() {
      if (!this.productId) {
        this.$notify.error({
          title: "错误",
          message: "请先保存货物基本信息"
        })
        return
      }
      if (this.form.id) {
        this.updateProductClassify()
      } else {
        this.addProductClassify()
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
      width: 100px;
    }
  }
}

.custom-select-name {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>