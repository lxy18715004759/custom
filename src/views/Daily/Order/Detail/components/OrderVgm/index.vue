<template>
  <div class="panel">
    <el-form :model="form" label-width="100px" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="船名" class="inherit-item">
            <el-input v-model="shipName" disabled placeholder="船名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="航次" class="inherit-item">
            <el-input v-model="shipCode" disabled placeholder="航次"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人" class="inherit-item">
            <el-input v-model="acceptPeople.name" disabled placeholder="收货人（英文名称）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="order" v-for="(item, index) in form.orderSeventhTotalVgmForms" :key="index">
        <el-row>
          <el-col :span="12">
            <el-form-item label="箱号">
              <el-input v-model="item.boxNumber" readonly placeholder="箱号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="提运单号">
              <el-input v-model="form.bb" placeholder="提运单号" readonly></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="称重单位">
              <el-input v-model="item.vgmUnit" placeholder="VGM称重单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="称重方法">
              <el-select v-model="item.vgmMethod" placeholder="称重方法">
                <el-option label="过磅重量" value="过磅重量"></el-option>
                <el-option label="累加重量" value="累加重量"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="称重时间">
              <el-date-picker v-model="item.vgmTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人">
              <el-input v-model="item.contact" placeholder="VGM联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderSeventh()">保存</el-button>
      <el-button type="success" icon="fa fa-download">导出VGM</el-button>
    </div>
  </div>
</template>

<script>
import { getOrderSeventhDetail, saveOrUpdateOrderSeventh } from "@/api"
import { mapState } from "vuex"

//内部单号
class BoxItem {
  constructor(boxNumber) {
    this.boxNumber = boxNumber
    this.contact = ""
    this.deliveryNumber = ""
    this.vgmMethod = ""
    this.vgmTime = ""
    this.vgmUnit = ""
  }
}

export default {
  data() {
    return {
      form: {
        acceptPeopleId: "",
        acceptPeopleName: "",
        acceptPeoplePhone: "",
        orderNumber: "",
        orderSeventhTotalVgmForms: [],
        shipCode: "",
        shipName: ""
      },
      radio: 3,
      date: "",
      splitNum: 3
    }
  },
  computed: {
    ...mapState("order", ["orderNumber", "mode", "shipName", "shipCode", "acceptPeople", "orderBoxList", "boxList"])
  },
  watch: {
    orderBoxList: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        // this.calcBoxList()
      }
    }
  },
  created() {
    if (this.mode == "detail") {
      this.getOrderSeventhDetail()
    } else {
      this.createBoxList()
    }
  },
  methods: {
    saveOrUpdateOrderSeventh() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        orderNumber: this.orderNumber
      }
      saveOrUpdateOrderSeventh(params).then(res => {
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
      })
    },

    getOrderSeventhDetail() {
      let params = {
        orderNumber: this.orderNumber
      }
      getOrderSeventhDetail(params).then(res => {
        if (res) {
          this.form = res

          if (!res.orderSeventhTotalVgmForms || res.orderSeventhTotalVgmForms.length == 0) {
            this.createBoxList()
          }
        } else {
          this.createBoxList()
        }
      })
    },

    createBoxList() {
      let list = this.boxList.map(item => {
        return new BoxItem(item.boxNumber)
      })
      this.form.orderSeventhTotalVgmForms = list
    },

    calcBoxList() {
      console.log(this.orderBoxList)
      let mainOrders = this.orderBoxList
      for (let index = 0; index < mainOrders.length; index++) {
        const orders = mainOrders[index].orderFifthTotalBillDetailForms
        for (let idx = 0; idx < orders.length; idx++) {
          const boxes = orders[idx].orderFifthBillBoxForms
        }
      }
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
</style>