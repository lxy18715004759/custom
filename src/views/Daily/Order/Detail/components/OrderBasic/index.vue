<template>
  <div class="panel">
    <el-form :model="form" label-width="140px" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-select
              filterable
              :filter-method="customerCodeFilter"
              clearable
              default-first-option
              v-model="form.customerName"
              value-key="customerCode"
              @change="customerChange"
              @clear="customerCodeFilter()"
              placeholder="请选择"
            >
              <el-option class="custom-select-select" :label="item.chineseName" :value="item" v-for="(item, index) in customerCode(customerKeyword)" :key="item.customerCode">
                <span class="custom-select-name">{{item.chineseName}}</span>
                <span class="custom-select-code">{{item.customerCode}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编号(合同/发票)">
            <el-input placeholder="请输入内容" v-model="form.contractValue">
              <el-select v-model="form.contractType" filterable automatic-dropdown default-first-option slot="prepend" placeholder="请选择">
                <el-option label="合同" value="合同"></el-option>
                <el-option label="发票" value="发票"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计出货时间(ETD)">
            <DatePicker v-model="form.sendTime"></DatePicker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="订单类型">
            <el-select v-model="form.orderType" default-first-option filterable automatic-dropdown placeholder="订单类型">
              <el-option :label="item" :value="item" v-for="(item, index) in DICT.orderType" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="销售">
            <el-input v-model="form.saleName" readonly placeholder="销售"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="客服">
            <el-input v-model="form.serviceName" readonly placeholder="客服"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="发货人(Shipper)">
            <el-select v-model="form.sendPeopleName" default-first-option value-key="id" filterable @change="sendPeopleChange" placeholder="发货人">
              <el-option :label="item.englishName" :value="item" v-for="(item, index) in sendList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人(Consignee)">
            <el-select v-model="form.acceptPeopleName" default-first-option value-key="id" filterable @change="acceptPeopleChange" placeholder="收货人">
              <el-option :label="item.englishName" :value="item" v-for="(item, index) in acceptList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通知人(Notifier)">
            <el-select v-model="form.noticePeopleName" default-first-option value-key="id" filterable @change="noticePeopleChange" placeholder="通知人">
              <el-option :label="item.englishName" :value="item" v-for="(item, index) in noticeList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row></el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="品名">
            <el-input v-model="form.goodName" placeholder="品名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="唛头">
            <el-input v-model="form.mark" placeholder="唛头"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="启运港">
            <el-select v-model="form.startPortName" automatic-dropdown filterable default-first-option placeholder="启运港">
              <el-option label="SHANGHAI" value="SHANGHAI"></el-option>
              <el-option label="NINGBO" value="NINGBO"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <template slot="label">运抵国</template>
            <el-select
              filterable
              :filter-method="countryCodeFilter"
              @change="countryChange"
              value-key="code"
              clearable
              default-first-option
              placeholder="输入国家名或代码"
              :value="displayValue(form.countryName,form.countryCode)"
              @clear="countryCodeFilter()"
            >
              <el-option class="custom-select-select" :value="item" v-for="(item, index) in allCountryCode(countryKeyword)" :key="item.code">
                <span class="custom-select-name">{{item.name}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="预配船期">
            <DatePicker v-model="form.bookShipTime"></DatePicker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="目的港">
            <el-select
              :value="displayValue(form.endPortEnglishName,form.endPortCode)"
              :remote-method="searchTargetPortCode"
              @change="endPortChange"
              value-key="code"
              filterable
              remote
              reserve-keyword
              placeholder="输入名称或代码搜索"
            >
              <el-option class="custom-select-select" :value="item" v-for="(item, index) in targetPortList" :key="item.code">
                <span class="custom-select-name">{{item.englishName}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- 目的港选其它 出现 -->
          <el-form-item label="最终目的地">
            <el-input v-model="form.lastEndAddress" placeholder="最终目的地"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卸货港">
            <el-select
              :value="displayValue(form.breakPortEnglishName,form.breakPortCode)"
              :remote-method="searchUnloadPortCode"
              @change="breakPortChange"
              value-key="code"
              filterable
              remote
              reserve-keyword
              placeholder="输入名称或代码搜索"
            >
              <el-option class="custom-select-select" :value="item" v-for="(item, index) in unloadPortCodeList" :key="item.code">
                <span class="custom-select-name">{{item.englishName}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="运输包装">
            <el-input v-model="form.transportBoxType" placeholder="运输包装"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交方式">
            <el-select v-model="form.closeType" filterable default-first-option placeholder="成交方式">
              <el-option :label="item" :value="item" v-for="(item, index) in DICT.dealMethod" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运输条款">
            <el-select v-model="form.deliveryTerms" filterable default-first-option placeholder="运输条款">
              <el-option :label="item" :value="item" v-for="(item, index) in DICT.transportTerm" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="本单联系人">
            <el-select disabled v-model="form.orderUser" placeholder="本单联系人">
              <el-option label="张三" value="shanghai"></el-option>
              <el-option label="李四" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订舱方（船代）">
            <el-select v-model="form.bookProxy" :remote-method="searchCompanyByType" filterable remote reserve-keyword placeholder="输入名称或代码搜索">
              <el-option class="custom-select-select" :value="item.chineseName" v-for="(item, index) in shipCompanyList" :key="item.code">
                <span class="custom-select-name">{{item.chineseName}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="船公司">
            <el-input v-model="form.shipCompany" placeholder="船公司"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="出货备注">
            <el-input v-model="form.remark" placeholder="出货备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="运输包装件数">
            <el-input v-model="form.transportBoxPiece" placeholder="运输包装件数"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="总毛重(KGS)">
            <el-input v-model="form.transportGrossWeightValue" placeholder="总毛重"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="总体积(CBM)">
            <el-input v-model="form.transportVolumeValue" placeholder="总体积"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <BoxSpec ref="box" v-model="form.orderFirstBoxForms" :mode="mode"></BoxSpec>
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderFirst()">保存</el-button>
      <el-button type="success" icon="fa fa-download" @click="getOrderExport()">导出托书</el-button>
    </div>
  </div>
</template>

<script>
import BoxSpec from "../BoxSpec"
import hotkeys from "hotkeys-js"
import DatePicker from "@/components/DatePicker"
import { searchPortCode, getCustomerUnit, getCustomer, saveOrUpdateOrderFirst, searchCompanyByType, getOrderFirstDetail, getOrderExport } from "@/api"
import { mapGetters, mapActions, mapState, mapMutations } from "vuex"
export default {
  components: {
    BoxSpec,
    DatePicker
  },
  data() {
    return {
      form: {
        acceptPeopleId: "",
        acceptPeopleName: "",
        acceptPeoplePhone: "",
        bookProxy: "",
        bookShipTime: "",
        boxTotal: "",
        breakPortCode: "",
        breakPortEnglishName: "",
        breakPortName: "",
        closeType: "FOB",
        contractType: "合同",
        contractValue: "",
        countryCode: "",
        countryName: "",
        customerId: "",
        customerName: "",
        deliveryTerms: "CY-CY",
        endPortCode: "",
        endPortEnglishName: "",
        endPortName: "",
        goodName: "",
        lastEndAddress: "",
        mark: "",
        noticePeopleId: "",
        noticePeopleName: "",
        noticePeoplePhone: "",
        orderType: "海运出口整箱",
        orderUser: "",
        remark: "",
        saleId: "",
        saleName: "",
        sendPeopleId: "",
        sendPeopleName: "",
        sendPeoplePhone: "",
        sendTime: "",
        serviceId: "",
        serviceName: "",
        shipCompany: "",
        shipId: "",
        startPortCode: "",
        startPortEnglishName: "",
        startPortName: "SHANGHAI",
        transportBoxPiece: null,
        transportBoxType: "",
        transportGrossWeightUnit: "KGS",
        transportGrossWeightValue: null,
        transportVolumeUnit: "CBM",
        transportVolumeValue: null
      },
      sendList: [],
      acceptList: [],
      noticeList: [],

      customerKeyword: "",
      operatorKeyword: "",
      salesKeyword: "",
      countryKeyword: "",
      targetPortList: [],
      unloadPortCodeList: [],
      shipCompanyList: [],
      radio: 3,
      date: "",
      index: 0,
      now: "2019-11-25"
    }
  },
  mounted() {},
  computed: {
    ...mapGetters("dict", ["customerCode", "allCountryCode"]),
    ...mapState("user", ["companyCode"]),
    ...mapState("order", ["orderNumber", "mode"])
  },
  created() {
    this.getSimpleCustomerRo()
    this.getAllCountryCode()
    if (this.mode == "detail") {
      this.getOrderFirstDetail()
    }
  },
  methods: {
    ...mapActions("dict", ["getSimpleCustomerRo", "getAllCountryCode"]),
    ...mapMutations("order", ["SET_ORDER_NUMBER", "SET_CUSTOMER_ID"]),

    getOrderFirstDetail() {
      let params = {
        orderNumber: this.orderNumber
      }
      getOrderFirstDetail(params).then(res => {
        this.form = res
        this.SET_CUSTOMER_ID(res.customerId)
      })
    },
    getOrderExport() {
      let params = {
        orderNumber: this.orderNumber,
        type: 1
      }
      getOrderExport(params).then(res => {
        if (res) {
          window.open(res)
        }
        console.log(res)
      })
    },
    // 港口搜索
    searchPortCode(e) {
      let params = {
        appId: this.GLOBAL.appId,
        keywords: e
      }
      return new Promise(resolve => {
        searchPortCode(params).then(res => {
          resolve(res)
        })
      })
    },
    // 目的港
    async searchTargetPortCode(e) {
      if (!e) return
      this.targetPortList = await this.searchPortCode(e)
    },
    // 卸货港
    async searchUnloadPortCode(e) {
      if (!e) return
      this.unloadPortCodeList = await this.searchPortCode(e)
    },

    displayValue(name, code) {
      code = code ? " (" + code + ")" : ""
      name = name ? name : ""
      return name + code
    },

    // 选择 客户
    customerChange(item) {
      this.form.customerName = item.chineseName
      this.form.customerId = item.id

      let id = item.id
      this.getCustomer(id)
      this.getCustomerUnit(id)
      this.resetContacts()
    },

    resetContacts() {
      this.form.acceptPeopleId = ""
      this.form.acceptPeopleName = ""
      this.form.acceptPeoplePhone = ""
      this.form.noticePeopleId = ""
      this.form.noticePeopleName = ""
      this.form.noticePeoplePhone = ""
      this.form.sendPeopleId = ""
      this.form.sendPeopleName = ""
      this.form.sendPeoplePhone = ""
    },

    sendPeopleChange(item) {
      console.log(item)
      this.form.sendPeopleId = item.id
      this.form.sendPeopleName = item.englishName
      this.form.sendPeoplePhone = item.phoneNumber
    },

    acceptPeopleChange(item) {
      console.log(item)
      this.form.acceptPeopleId = item.id
      this.form.acceptPeopleName = item.englishName
      this.form.acceptPeoplePhone = item.phoneNumber
    },

    noticePeopleChange(item) {
      this.form.noticePeopleId = item.id
      this.form.noticePeopleName = item.englishName
      this.form.noticePeoplePhone = item.phoneNumber
    },

    countryChange(item) {
      this.form.countryCode = item.code
      this.form.countryName = item.name
    },

    endPortChange(item) {
      this.form.endPortCode = item.code
      this.form.endPortEnglishName = item.englishName
      this.form.endPortName = item.name
    },

    breakPortChange(item) {
      this.form.breakPortCode = item.code
      this.form.breakPortEnglishName = item.englishName
      this.form.breakPortName = item.name
    },

    // 根据客户id 获取收发通 选项
    getCustomerUnit(id) {
      let params = {
        customerId: id
      }
      getCustomerUnit(params).then(res => {
        this.sendList = res.filter(item => item.send == 1)
        this.acceptList = res.filter(item => item.accept == 1)
        this.noticeList = res.filter(item => item.notice == 1)
      })
    },

    searchCompanyByType(keywords) {
      let params = {
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode,
        type: 1,
        keywords
      }
      searchCompanyByType(params).then(res => {
        this.shipCompanyList = res
      })
    },

    saveOrUpdateOrderFirst() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode,
        orderFirstBoxForms: this.$refs.box.list
      }
      saveOrUpdateOrderFirst(params).then(res => {
        this.SET_ORDER_NUMBER(res.orderNumber)
        this.SET_CUSTOMER_ID(res.customerId)
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
      })
    },

    // 获取销售客服
    getCustomer(id) {
      let params = {
        id
      }
      getCustomer(params).then(res => {
        this.form.saleId = res.saleId
        this.form.saleName = res.saleName
        this.form.serviceId = res.serviceId
        this.form.serviceName = res.serviceName
      })
    },
    customerCodeFilter(e = "") {
      this.customerKeyword = e
    },

    countryCodeFilter(e = "") {
      this.countryKeyword = e
    },
    nextEnter(next) {
      setTimeout(() => {
        this.$refs[next].focus()
      }, 50)
    },
    prevBlur(prev) {
      this.$nextTick(() => {
        this.$refs[prev].blur()
      })
    },
    selectVisibleChange(visible, ref) {
      console.log(visible)
      if (visible) return
      this.nextEnter(ref)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>