<template>
  <div class="panel">
    <el-form :model="form" label-width="140px" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="开港时间" class="inherit-item">
            <el-input v-model="portStartTime" disabled placeholder="开港时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="截港时间" class="inherit-item">
            <el-input v-model="portEndTime" disabled placeholder="截港时间"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="委托装箱单位">
            <el-select v-model="form.transferUnitName" @change="transferUnitChange" value-key="code" :remote-method="searchCompanyByType" filterable remote reserve-keyword placeholder="输入名称或代码搜索">
              <el-option class="custom-select-select" :label="`${item.chineseName}（${item.code}）`" :value="item" v-for="(item, index) in carCompanyList" :key="item.code">
                <span class="custom-select-name">{{item.chineseName}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户联系人">
            <el-select v-model="form.customerPeopleName" @change="customerContactChange" filterable value-key="id" placeholder="客户联系人">
              <el-option :label="item.username" :value="item" v-for="(item, index) in customerContactList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户联系人电话">
            <el-input v-model="form.customerPeoplePhone" placeholder="客户联系人电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="装箱联系人">
            <el-select v-model="form.transferPersonName" @change="packageContactChange" filterable value-key="id" placeholder="装箱联系人">
              <el-option :label="item.username" :value="item" v-for="(item, index) in contactList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="装箱地址">
            <el-input v-model="form.transferAddress" autocomplete="off" placeholder="装箱地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="装箱时间">
            <el-date-picker v-model="form.transferTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="装箱特殊要求">
            <el-input v-model="form.transferRequire" placeholder="装箱特殊要求"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中转港代码">
            <el-select v-model="form.transferPortCode" :remote-method="searchTransferPortCode" @change="transferPortChange" value-key="code" filterable remote reserve-keyword placeholder="输入名称或代码搜索">
              <el-option class="custom-select-select" :label="`${item.name}（${item.code}）`" :value="item" v-for="(item, index) in transferPortList" :key="item.code">
                <span class="custom-select-name">{{item.name}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通知日期">
            <el-date-picker v-model="form.noticeTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="接收日期">
            <el-date-picker v-model="form.acceptTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拖车费">
            <el-input v-model="form.vehicleCost" placeholder="拖车费"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司内部联系人">
            <el-input v-model="form.internalContact" placeholder="公司内部联系人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <DriverSpec ref="driver" v-model="form.orderFourthBoxForms" :mode="mode"></DriverSpec>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.transferRemark" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderFourth()">保存</el-button>
      <el-button type="success" icon="fa fa-download">导出车队通知书</el-button>
    </div>
  </div>
</template>

<script>
import DriverSpec from "../DriverSpec"
import { saveOrUpdateOrderFourth, searchCompanyByType, getCustomerPeople, searchPortCode, getOrderFourthDetail } from "@/api"
import { mapGetters, mapActions, mapState, mapMutations } from "vuex"
export default {
  components: {
    DriverSpec
  },
  data() {
    return {
      form: {
        acceptTime: "",
        customerPeopleId: "",
        customerPeopleName: "",
        customerPeoplePhone: "",
        internalContact: "",
        noticeTime: "",
        orderNumber: "",
        orderFourthBoxForms: [],
        portEndTime: "",
        portStartTime: "",
        transferAddress: "",
        transferPersonName: "",
        transferPersonId: "",
        transferPortCode: "",
        transferRemark: "",
        transferRequire: "",
        transferTime: "",
        transferUnitId: "",
        transferUnitName: "",
        vehicleCost: ""
      },
      carCompanyList: [],
      contactList: [],
      transferPortList: [],
      customerContactList: []
    }
  },

  computed: {
    ...mapState("user", ["companyCode"]),
    ...mapState("order", ["orderNumber", "mode", "customerId", "portStartTime", "portEndTime"])
  },

  watch: {
    customerId: {
      immediate: true,
      handler(newValue, oldValue) {
        this.customerContacts(newValue)
      }
    }
  },

  created() {
    if (this.mode == "detail") {
      this.getOrderFourthDetail()
    }
  },

  methods: {
    ...mapMutations("order", ["SET_BOX_LIST"]),
    searchCompanyByType(keywords) {
      let params = {
        appId: this.GLOBAL.appId,
        companyCode: this.companyCode,
        type: 1,
        keywords
      }
      searchCompanyByType(params).then(res => {
        this.carCompanyList = res
      })
    },

    saveOrUpdateOrderFourth() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        orderNumber: this.orderNumber
      }
      saveOrUpdateOrderFourth(params).then(res => {
        this.SET_BOX_LIST(this.form.orderFourthBoxForms)
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
      })
    },

    getOrderFourthDetail() {
      let params = {
        orderNumber: this.orderNumber
      }
      getOrderFourthDetail(params).then(res => {
        if (res) {
          this.form = res
          this.packageContacts(res.transferUnitId)
          this.SET_BOX_LIST(this.form.orderFourthBoxForms)
        }
      })
    },

    // 选择运输公司
    transferUnitChange(item) {
      console.log(item)
      this.form.transferUnitId = item.id
      this.form.transferUnitName = item.chineseName
      this.packageContacts(item.id)
    },

    // 查询联系人信息
    getCustomerPeople(id) {
      let params = {
        customerId: id
      }
      return new Promise(resolve => {
        getCustomerPeople(params).then(res => {
          resolve(res)
        })
      })
    },

    // 装箱联系人
    async packageContacts(id) {
      this.contactList = await this.getCustomerPeople(id)
    },

    // 客户联系人
    async customerContacts(id) {
      this.customerContactList = await this.getCustomerPeople(id)
    },

    customerContactChange(item) {
      this.form.customerPeopleId = item.id
      this.form.customerPeopleName = item.username
      this.form.customerPeoplePhone = item.phoneNumber
    },

    packageContactChange(item) {
      this.form.transferPersonId = item.id
      this.form.transferPersonName = item.username
    },

    // 模糊查询港口
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
    // 中转港
    async searchTransferPortCode(e) {
      this.transferPortList = await this.searchPortCode(e)
    },

    transferPortChange(item) {
      this.form.transferPortCode = item.code
    }
  }
}
</script>

<style lang="scss" scoped>
</style>