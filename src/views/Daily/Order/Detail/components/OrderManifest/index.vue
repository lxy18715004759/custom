<template>
  <div class="panel">
    <el-form :model="form" label-width="140px" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="船公司">
            <el-select v-model="form.shipCompany" :remote-method="searchCompanyByType" filterable remote reserve-keyword placeholder="输入名称或代码搜索">
              <el-option class="custom-select-select" :value="item.chineseName" v-for="(item, index) in shipCompanyList" :key="item.code">
                <span class="custom-select-name">{{item.chineseName}}</span>
                <span class="custom-select-code">{{item.code}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="包装代码">
            <el-select v-model="form.packageCode" placeholder="包装代码">
              <el-option label="散装" value="散装"></el-option>
              <el-option label="裸装" value="裸装"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="报关HS_CODE">
            <!-- <el-select v-model="form.declareCode" multiple placeholder="报关HS_CODE">
              <el-option label="s2324" value="shanghai"></el-option>
              <el-option label="s2122" value="beijing"></el-option>
            </el-select>-->
            <el-input v-model="form.declareCode" placeholder="报关HS_CODE"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider>收发通信息</el-divider>

      <div class="contacts">
        <div class="section" v-for="(item, index) in shipperList" :key="index">
          <div class="title">
            发货人
            <br />(Shipper)
          </div>
          <div class="table">
            <table border="1">
              <tr>
                <th>提单号</th>
                <td colspan="5">A328842849328</td>
              </tr>
              <tr>
                <th>代码</th>
                <td>Bill Gates</td>
                <th>名称</th>
                <td colspan="3">{{item.peopleName}}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td colspan="5">{{item.address}}</td>
              </tr>
              <tr>
                <th>国家代码</th>
                <td>CN</td>
                <th>省份</th>
                <td>浙江省</td>
                <th>城市</th>
                <td>杭州市</td>
              </tr>
              <tr>
                <th>电话</th>
                <td>{{item.telephone}}</td>
                <th>e-mail</th>
                <td>{{item.email}}</td>
                <th>传真</th>
                <td>03232-32231</td>
              </tr>
              <tr>
                <th>AEO企业代码</th>
                <td colspan="5">83232</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="section recive">
          <div class="title">
            收货人
            <br />(Consignee)
          </div>
          <div class="table">
            <table border="1">
              <tr>
                <th>代码</th>
                <td>Bill Gates</td>
                <th>名称</th>
                <td colspan="3">{{consignee.peopleName}}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td colspan="5">{{consignee.address}}</td>
              </tr>
              <tr>
                <th>国家代码</th>
                <td>CN</td>
                <th>省份</th>
                <td>浙江省</td>
                <th>城市</th>
                <td>杭州市</td>
              </tr>
              <tr>
                <th>电话</th>
                <td>{{consignee.telephone}}</td>
                <th>e-mail</th>
                <td>{{consignee.email}}</td>
                <th>传真</th>
                <td>03232-32231</td>
              </tr>
              <tr>
                <th>AEO企业代码</th>
                <td colspan="5">83232</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="section notify">
          <div class="title">
            通知人
            <br />(Notifier)
          </div>
          <div class="table">
            <table border="1">
              <tr>
                <th>代码</th>
                <td>Bill Gates</td>
                <th>名称</th>
                <td colspan="3">{{notifier.peopleName}}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td colspan="5">{{notifier.address}}</td>
              </tr>
              <tr>
                <th>国家代码</th>
                <td>CN</td>
                <th>省份</th>
                <td>浙江省</td>
                <th>城市</th>
                <td>杭州市</td>
              </tr>
              <tr>
                <th>电话</th>
                <td>{{notifier.telephone}}</td>
                <th>e-mail</th>
                <td>{{notifier.email}}</td>
                <th>传真</th>
                <td>03232-32231</td>
              </tr>
              <tr>
                <th>AEO企业代码</th>
                <td colspan="5">83232</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!-- <div class="order" v-for="(item, index) in splitNum" :key="index">
          <el-row>
            <el-col :span="8">
              <el-form-item label="提运单号" label-width="80px">
                <el-select v-model="form.jj" multiple disabled placeholder="提运单号">
                  <el-option label="A00023123213" value="A00023123213"></el-option>
                  <el-option label="A00023123215" value="A00023123215"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发货人税务登记号">
                <el-input v-model="form.aa" placeholder="发货人税务登记号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发货人国家代码">
                <el-select v-model="form.bb" placeholder="发货人国家代码">
                  <el-option label="CN" value="shanghai"></el-option>
                  <el-option label="US" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
      </div>-->
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderSix()">保存</el-button>
      <el-button type="success" icon="fa fa-download">导出舱单</el-button>
    </div>
  </div>
</template>

<script>
import { saveOrUpdateOrderSix, getOrderSixDetail, searchCompanyByType, getCustomerUnit } from "@/api"
import { mapState } from "vuex"
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        declareCode: "",
        packageCode: "",
        shipCompany: "",
        shipId: ""
      },
      shipCompanyList: [],
      splitNum: 3,
      consignee: {},
      notifier: {},
      shipperList: []
    }
  },

  computed: {
    ...mapState("order", ["orderNumber", "mode", "customerId", "acceptPeople", "noticePeople", "sendPeopleList"]),
    ...mapState("user", ["companyCode"])
  },
  watch: {
    customerId(newValue, oldValue) {
      this.getCustomerUnit()
    },
    active(newValue, oldValue) {
      console.log(newValue)
      if (newValue) {
        this.getOrderSixDetail()
        this.getCustomerUnit()
      }
    }
  },

  created() {
    if (this.mode == "detail") {
      // this.getOrderSixDetail()
    }
  },

  methods: {
    saveOrUpdateOrderSix() {
      let params = {
        ...this.form,
        orderNumber: this.orderNumber
      }
      saveOrUpdateOrderSix(params).then(res => {
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
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

    getOrderSixDetail() {
      let params = {
        orderNumber: this.orderNumber
      }
      getOrderSixDetail(params).then(res => {
        if (res) {
          this.form = res
        }
      })
    },

    // 根据客户id 获取收发通 选项
    getCustomerUnit() {
      let params = {
        customerId: this.customerId
      }
      getCustomerUnit(params).then(res => {
        this.consignee =
          res.find(item => {
            return item.id == this.acceptPeople.id
          }) || {}
        this.notifier =
          res.find(item => {
            return item.id == this.noticePeople.id
          }) || {}

        this.shipperList = this.sendPeopleList.map(item => {
          console.log("222", item)
          return (
            res.find(people => {
              return people.id == item.id
            }) || {}
          )
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contacts {
  .section {
    display: flex;
    margin-bottom: 10px;
    .title {
      flex: 0 0 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: #f57f17;
      border: 1px solid #e4e7ed;
      border-right: 0;
      padding: 0 8px;
      font-weight: 600;
      color: #222;
    }

    &.recive {
      .title {
        background: #4caf50;
      }
    }

    &.notify {
      .title {
        background: #00bcd4;
      }
    }
    .table {
      flex: 1;
      table {
        width: 100%;
        border-collapse: collapse;
        background: #f5f7fa;
        border: 1px solid #e4e7ed;
        white-space: nowrap;
        tr {
          th {
            padding: 0 5px;
            color: #3f51b5;
            border-color: #e4e7ed;
            width: 130px;
          }
          td {
            padding: 0 5px;
            border-color: #e4e7ed;
          }
        }
      }
    }
  }
}
</style>