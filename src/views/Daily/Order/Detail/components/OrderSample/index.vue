<template>
  <div class="panel">
    <el-form :model="form" label-width="140px" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收货人（英文名称）">
            <el-select v-model="form.acceptPeopleName" default-first-option value-key="id" filterable @change="acceptPeopleChange" placeholder="收货人">
              <el-option :label="item.englishName" :value="item" v-for="(item, index) in acceptList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收货人联系方式">
            <el-input v-model="form.acceptPeoplePhone" placeholder="收货人联系方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="通知人（英文名称）">
            <el-select v-model="form.noticePeopleName" default-first-option value-key="id" filterable @change="noticePeopleChange" placeholder="通知人">
              <el-option :label="item.englishName" :value="item" v-for="(item, index) in noticeList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通知人联系方式">
            <el-input v-model="form.noticePeoplePhone" placeholder="通知人联系方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="BL Type(提单类型)">
            <el-select v-model="form.billType" placeholder="提单类型">
              <el-option label="正本提单" value="shanghai"></el-option>
              <el-option label="海运单" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运费条款">
            <el-radio-group v-model="form.transferTerms">
              <el-radio label="CNF或CIF">CNF或CIF</el-radio>
              <el-radio label="FOB">FOB</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="品名">
            <el-input v-model="form.goodName" placeholder="品名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="唛头">
            <el-input v-model="form.mark" placeholder="唛头"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ----------------------订单详情--------------------------------------- -->
      <el-divider>订单详情</el-divider>
      <div class="order" v-for="(item, index) in form.orderFifthTotalBillForms" :key="index">
        <el-row>
          <el-col :span="6">
            <el-form-item label="主单号" label-width="60px">
              <el-select v-model="item.mainDeliveryNumber" @change="ordersChange($event,item)" placeholder="提运单号">
                <el-option :label="orderNum" :value="orderNum" v-for="(orderNum, index) in orderNumberList" :key="orderNum"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18" v-if="isMutipleOrder">
            <el-form-item label="分单号" label-width="100px">
              <el-select v-model="item.otherDeliveryNumbersList" @change="ordersChange($event,item)" multiple placeholder="分提运单号">
                <el-option :label="orderNum" :value="orderNum" v-for="(orderNum, index) in orderNumberList" :key="orderNum"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发货人（英文）" label-width="120px">
              <el-select v-model="item.sendPeopleName" default-first-option value-key="id" filterable @change="sendPeopleChange($event,index)" placeholder="发货人">
                <el-option :label="user.englishName" :value="user" v-for="(user, index) in sendList" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" label-width="100px">
              <el-input v-model="item.sendPeoplePhone" placeholder="发货人联系方式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物信息" label-width="80px">
              <el-select v-model="item.orderFifthBillGoodForms" multiple collapse-tags placeholder="货物信息">
                <!-- <el-option label="陶瓷马桶陶瓷马桶陶" value="2"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="order-item" v-for="(order, index) in item.orderFifthTotalBillDetailForms" :key="index">
          <el-row>
            <el-col :span="6">
              <el-form-item label="单号" label-width="90px">
                <el-input v-model="order.deliveryNumber" placeholder="单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提单件数" label-width="90px">
                <el-input v-model="order.piece" placeholder="提单件数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提单毛重" label-width="90px">
                <el-input v-model="order.weight" placeholder="提单毛重"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提单体积" label-width="90px">
                <el-input v-model="order.volume" placeholder="提单体积"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="spec">
            <el-form>
              <div class="row" v-for="(cargo, index) in order.orderFifthBillBoxForms" :key="index">
                <el-form-item label="箱号">
                  <el-select v-model="cargo.boxNumber" value-key="id" @change="boxChange($event,cargo)" placeholder="箱号">
                    <el-option :label="box.boxNumber" :value="box" v-for="(box, index) in boxList" :key="box.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="箱型">
                  <el-input v-model="cargo.boxType" readonly placeholder="箱号"></el-input>
                </el-form-item>
                <el-form-item label="封号">
                  <el-input v-model="cargo.closeNumber" readonly placeholder="封号"></el-input>
                </el-form-item>

                <el-form-item label="分货物件数">
                  <el-input v-model="cargo.piece" placeholder="箱内货物件数"></el-input>
                </el-form-item>

                <el-form-item label="分货物毛重">
                  <el-input v-model="cargo.weight" placeholder="箱内货物毛重"></el-input>
                </el-form-item>

                <el-form-item label="分货物体积">
                  <el-input v-model="cargo.volume" placeholder="箱内货物体积"></el-input>
                </el-form-item>

                <div class="edit" @click="addBox(order.orderFifthBillBoxForms)" v-if="index == 0">
                  <i class="el-icon-plus"></i>
                </div>
                <div class="edit" @click="remove(order.orderFifthBillBoxForms,index)" v-else>
                  <i class="el-icon-minus"></i>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderFifth()">保存</el-button>
      <el-button type="success" icon="fa fa-download">导出提单样本</el-button>
      <el-button type="success" v-if="splitNum == 1 && isMutipleOrder" @click="dialogVisible = true">拆单</el-button>
      <el-button type="warn" v-if="splitNum > 1" @click="merge()">合并</el-button>
    </div>

    <el-dialog title="请输入拆单数量" :visible.sync="dialogVisible" width="30%">
      <span>共有{{orderAmount}}个提运单号，拆分为</span>
      <el-input-number class="input-number" v-model="splitNumInput" controls-position="right" :min="1" :max="orderAmount"></el-input-number>
      <span>单</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveOrUpdateOrderFifth, getOrderFifthDetail, getCustomerUnit } from "@/api"
import { mapState, mapMutations, mapGetters } from "vuex"
//外层分单
class MainOrderItem {
  constructor(mainDeliveryNumber) {
    this.mainDeliveryNumber = mainDeliveryNumber
    this.orderFifthBillGoodForms = []
    this.orderFifthTotalBillDetailForms = []
    this.otherDeliveryNumbers = ""
    this.otherDeliveryNumbersList = []
    this.sendPeopleId = ""
    this.sendPeopleName = ""
    this.sendPeoplePhone = ""
  }
}

//内部单号
class OrderItem {
  constructor(deliveryNumber) {
    this.deliveryNumber = deliveryNumber
    this.orderFifthBillBoxForms = []
    this.orderNumber = ""
    this.piece = ""
    this.volume = ""
    this.weight = ""
  }
}

class BoxItem {
  constructor(item = {}) {
    this.boxNumber = item.boxNumber
    this.boxType = item.boxType
    this.closeNumber = item.closeNumber
    this.weight = ""
    this.volume = ""
    this.piece = ""
  }
}

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
        acceptPeopleId: "",
        acceptPeopleName: "",
        acceptPeoplePhone: "",
        billType: "",
        goodName: "",
        mark: "",
        noticePeopleId: "",
        noticePeopleName: "",
        noticePeoplePhone: "",
        orderFifthTotalBillForms: [],
        orderNumber: "",
        transferTerms: "FOB"
      },
      dialogVisible: false,
      splitNum: 1,
      splitNumInput: 1,
      sendList: [],
      acceptList: [],
      noticeList: []
    }
  },
  computed: {
    ...mapState("order", ["orderNumber", "mode", "customerId", "boxList"]),
    ...mapGetters("order", ["orderNumberList"]),
    orderAmount() {
      return this.orderNumberList.length || 0
    },
    isMutipleOrder() {
      return this.orderNumberList && this.orderNumberList.length > 1
    }
  },
  watch: {
    customerId(newValue, oldValue) {
      if (newValue) {
        this.getCustomerUnit()
      }
    },

    active(newValue, oldValue) {
      if (newValue) {
        this.getOrderFifthDetail()
      }
    }
  },
  created() {},
  methods: {
    ...mapMutations("order", ["SET_CONTACT_PEOPLE", "SET_ORDER_BOX_LIST"]),

    // 拆单
    open() {
      this.$confirm("此票有加拼，是否拆分？", "提示", {
        confirmButtonText: "拆分",
        cancelButtonText: "不拆分",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = true
        })
        .catch(() => {})
    },

    // 合并订单
    merge() {
      this.$confirm("确认合并分单吗？", "提示", {
        confirmButtonText: "合并",
        cancelButtonText: "不合并",
        type: "warning"
      })
        .then(() => {
          this.splitNum = 1
          this.creatOrderList()
        })
        .catch(() => {})
    },

    // 保存 更新
    saveOrUpdateOrderFifth() {
      this.convertOtherDeliveryNumber("string")
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        orderNumber: this.orderNumber
      }

      saveOrUpdateOrderFifth(params).then(res => {
        this.SET_CONTACT_PEOPLE(this.form)
        this.SET_ORDER_BOX_LIST(this.form.orderFifthTotalBillForms)
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
      })
    },

    // 获取信息
    getOrderFifthDetail() {
      let params = {
        orderNumber: this.orderNumber
      }
      getOrderFifthDetail(params).then(res => {
        if (res) {
          this.form = res
          this.convertOtherDeliveryNumber("array")
          this.SET_CONTACT_PEOPLE(this.form)
          if (!res.orderFifthTotalBillForms || res.orderFifthTotalBillForms.length == 0) {
            this.autoCreateOrderList()
          }
        } else {
          this.autoCreateOrderList()
        }
      })
    },

    // 拼单号转数组 或字符串
    convertOtherDeliveryNumber(type) {
      let list = this.form.orderFifthTotalBillForms
      list.forEach(item => {
        if (type == "array") {
          item.otherDeliveryNumbersList = item.otherDeliveryNumbers.split(",")
        }
        if (type == "string") {
          item.otherDeliveryNumbers = item.otherDeliveryNumbersList.join(",")
        }
      })
    },

    // 单号改变 生成订单列表
    ordersChange(e, item) {
      console.log(item)
      let allDeliveryNumbers = [item.mainDeliveryNumber, ...item.otherDeliveryNumbersList]
      let arr = allDeliveryNumbers.map(order => {
        return new OrderItem(order)
      })
      item.orderFifthTotalBillDetailForms = arr
    },

    // 根据客户id 获取收发通 选项
    getCustomerUnit() {
      let params = {
        customerId: this.customerId
      }
      getCustomerUnit(params).then(res => {
        this.sendList = res.filter(item => item.send == 1)
        this.acceptList = res.filter(item => item.accept == 1)
        this.noticeList = res.filter(item => item.notice == 1)
      })
    },

    // 发货人选择
    sendPeopleChange(item, index) {
      console.log(item)
      this.form.orderFifthTotalBillForms[index].sendPeopleId = item.id
      this.form.orderFifthTotalBillForms[index].sendPeopleName = item.englishName
      this.form.orderFifthTotalBillForms[index].sendPeoplePhone = item.phoneNumber
    },

    // 收货人选择
    acceptPeopleChange(item) {
      console.log(item)
      this.form.acceptPeopleId = item.id
      this.form.acceptPeopleName = item.englishName
      this.form.acceptPeoplePhone = item.phoneNumber
    },

    // 通知人选择
    noticePeopleChange(item) {
      this.form.noticePeopleId = item.id
      this.form.noticePeopleName = item.englishName
      this.form.noticePeoplePhone = item.phoneNumber
    },

    // 确认拆单
    confirm() {
      this.dialogVisible = false
      this.splitNum = this.splitNumInput
      this.creatOrderList()
    },

    // 如果仅有一个单号 自动生成表单 填充数据
    autoCreateOrderList() {
      if (!this.isMutipleOrder) {
        let number = this.orderNumberList[0]
        let item = new MainOrderItem(number)
        let order = new OrderItem(number)
        order.orderFifthBillBoxForms = this.boxList.map(item => {
          return new BoxItem(item)
        })
        item.orderFifthTotalBillDetailForms = [order]
        this.form.orderFifthTotalBillForms = [item]
      }
    },

    // 拆单生成表单
    creatOrderList() {
      this.form.orderFifthTotalBillForms = Array.from({ length: this.splitNum }, () => new MainOrderItem())
    },

    // 添加箱子
    addBox(list) {
      list.push(new BoxItem())
    },

    // 删除箱子
    remove(list, index) {
      list.splice(index, 1)
    },

    // 箱号选中 自动填充数据
    boxChange(e, item) {
      item.boxNumber = e.boxNumber
      item.boxType = e.boxType
      item.closeNumber = e.closeNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  background: #eaeef2;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px dashed #0b80c5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.input-number {
  margin: 10px;
}

.order-item {
  border: 1px dashed #67c23a;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.spec {
  .row {
    display: flex;
    align-items: center;
    background: #dbe5f0;
    padding: 6px 12px;
    margin-bottom: 5px;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;

    &.total {
      span {
        margin-right: 5px;
      }
      .sum {
        background: #fff;
        display: flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 4px;
        margin-right: 10px;
      }
    }

    .edit {
      flex-shrink: 0;
      text-align: center;
      height: 18px;
      width: 18px;
      line-height: 18px;
      border: 1px solid #409eff;
      border-radius: 2px;
      color: #409eff;
      cursor: pointer;
    }
  }

  /deep/.el-form {
    .el-form-item {
      margin-right: 5px;
      margin-bottom: 0;
      flex: 1;
      .el-select {
        width: 100%;
      }
      .el-form-item__content {
        overflow: hidden;
      }
      .el-input-group__append {
        padding: 0 5px;
      }
    }
  }
}
</style>