<template>
  <el-form :model="form" label-width="120px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="客户代码">
          <el-input v-model="form.customerCode" placeholder="客户代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销售">
          <el-select filterable :filter-method="salesFilter" clearable default-first-option v-model="form.saleId" @clear="salesFilter()" placeholder="操作员（客服）">
            <el-option :label="item.nickName" :value="item.id" v-for="(item, index) in companySales(salesKeyword)" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="客服">
          <el-select filterable :filter-method="operatorFilter" clearable default-first-option v-model="form.serviceId" @clear="operatorFilter()" placeholder="操作员（客服）">
            <el-option :label="item.nickName" :value="item.id" v-for="(item, index) in companyOperator(operatorKeyword)" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="中文全称">
          <el-input v-model="form.chineseName" @change="getCreditCode()" placeholder="中文全称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="中文简称">
          <el-input v-model="form.customerSimpleName" placeholder="中文简称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="英文名称">
          <el-input v-model="form.englishName" placeholder="英文名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="中文地址">
          <el-input v-model="form.chineseAddress" placeholder="中文地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="英文地址">
          <el-input v-model="form.englishAddress" placeholder="英文地址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="国家">
          <el-select filterable :filter-method="countryCodeFilter" clearable default-first-option v-model="form.countryCode" @clear="countryCodeFilter()" placeholder="输入国家名或代码">
            <el-option class="custom-select-select" :label="item.name" :value="item.code" v-for="(item, index) in allCountryCode(countryKeyword)" :key="item.code">
              <span class="custom-select-name">{{item.name}}</span>
              <span class="custom-select-code">{{item.code}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公司邮箱">
          <el-input v-model="form.companyEmail" placeholder="公司邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="海关十位数编码">
          <el-input v-model="form.customsCode" placeholder="海关十位数编码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="税务登记号">
          <el-input v-model="form.taxCode" placeholder="税务登记号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="银行">
          <el-input v-model="companyInfo.bank" readonly placeholder="银行"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="银行账号">
          <el-input v-model="companyInfo.bankAccount" readonly placeholder="银行账号"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="公司地址">
          <el-input v-model="companyInfo.address" readonly placeholder="公司地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系电话">
          <el-input v-model="companyInfo.tel" readonly placeholder="联系电话"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item label="客户类别">
          <el-radio-group v-model="form.customerType">
            <el-radio label="直客">直客</el-radio>
            <el-radio label="同行">同行</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="黑名单标识">
          <el-radio-group v-model="form.blackList">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结算类型">
          <el-select v-model="form.accountType" placeholder="请选择" @change="accountTypeChange">
            <el-option label="现结" value="现结"></el-option>
            <el-option label="账期结算" value="账期结算"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8" v-if="form.accountType == '账期结算'">
        <el-form-item label="账期">
          <el-select v-model="form.accountPeriod" placeholder="请选择">
            <el-option :label="`${index+1}个月`" :value="`${index+1}个月`" v-for="(item, index) in 12" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" v-if="form.accountType == '账期结算'">
        <el-form-item label="账单日">
          <el-select v-model="form.accountTime" placeholder="请选择">
            <el-option :label="`每月${index+1}日`" :value="`每月${index+1}日`" v-for="(item, index) in 31" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <div class="tac">
      <el-button type="primary" icon="fa fa-save" :loading="buttonLoading" @click="saveForm()">保存</el-button>
    </div>
  </el-form>
</template>

<script>
import { addCustomer, updateCustomer, getCustomer, getCreditCode } from "@/api"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        accountPeriod: "",
        accountTime: "",
        accountType: "",
        blackList: 0,
        chineseAddress: "",
        chineseName: "",
        companyEmail: "",
        countryCode: "",
        customerCode: "",
        customerSimpleName: "",
        customerType: "直客",
        customsCode: "",
        englishAddress: "",
        englishName: "",
        id: "",
        serviceId: "",
        pinyinName: "",
        saleId: "",
        taxCode: ""
      },
      countryKeyword: "",
      operatorKeyword: "",
      salesKeyword: "",
      buttonLoading: false,
      companyInfo: {}
    }
  },

  computed: {
    ...mapState("user", ["companyCode"]),
    ...mapState("customerDetail", ["mode", "customerId"]),
    ...mapGetters("dict", ["allCountryCode", "companyOperator", "companySales"])
  },
  created() {
    this.getAllCountryCode()
    this.getCompanyOperatorUser()
    this.getCompanySalesperson()

    if (this.mode == "detail") {
      this.getCustomer()
    }
    if (this.$route.query.copyFrom) {
      this.getCopyCustomer(this.$route.query.copyFrom)
    }
  },
  methods: {
    ...mapMutations("customerDetail", ["SET_CUSTOMER_ID", "SET_COMPANY_NAME"]),
    ...mapActions("dict", ["getAllCountryCode", "getCompanyOperatorUser", "getCompanySalesperson"]),
    // 新增客户
    addCustomer() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode
      }
      this.buttonLoading = true
      addCustomer(params)
        .then(res => {
          this.buttonLoading = false
          this.form.id = res.id
          this.SET_CUSTOMER_ID(res.id)
          this.SET_COMPANY_NAME(res.chineseName)
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

    // 修改客户
    updateCustomer() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode
      }
      this.buttonLoading = true
      updateCustomer(params)
        .then(res => {
          this.SET_COMPANY_NAME(res.chineseName)
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

    // 获取客户基本信息
    getCustomer() {
      let params = {
        id: this.customerId
      }
      getCustomer(params).then(res => {
        this.form = res
        this.SET_COMPANY_NAME(res.chineseName)
      })
    },

    // 获取复制客户基本信息
    getCopyCustomer(id) {
      let params = {
        id
      }
      getCustomer(params).then(res => {
        delete res.id
        this.form = res
      })
    },

    // 获取税务登记号
    getCreditCode() {
      let params = {
        keyword: this.form.chineseName
      }
      getCreditCode(params).then(res => {
        this.form.taxCode = res.creditCode
        this.companyInfo = res
      })
    },

    // 提交
    saveForm() {
      if (this.form.id) {
        this.updateCustomer()
      } else {
        this.addCustomer()
      }
    },
    countryCodeFilter(e = "") {
      this.countryKeyword = e
    },
    operatorFilter(e = "") {
      this.operatorKeyword = e
    },
    salesFilter(e = "") {
      this.salesKeyword = e
    },
    accountTypeChange(e) {
      this.form.accountPeriod = ""
      this.form.accountTime = ""
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  .el-select {
    width: 100%;
  }
}
</style>