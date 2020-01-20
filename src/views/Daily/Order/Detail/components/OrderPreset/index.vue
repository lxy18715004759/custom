<template>
  <div class="panel">
    <el-form :model="form" label-width="120px" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="主提运单号">
            <el-input v-model="form.mainDeliveryNumber" placeholder="主提运单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="sub-orders">
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
          <el-button v-else class="button-new-tag" type="primary" plain size="small" @click="showInput">+添加单号</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="拼单号">
            <div class="tags">
              <el-tag :key="tag" v-for="tag in otherDeliveryNumbersList" size="small" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            </div>
            <!-- <el-select @change="otherDeliveryChange" v-model="otherDeliveryNumbersList" multiple filterable allow-create default-first-option placeholder="输入提运单号 回车添加" no-data-text="输入提运单号 回车添加"></el-select> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="船名">
            <!-- <el-input v-model="form.shipName" clearable @clear="shipClear()" @input="toUpperCase($event, 'shipName')" @keyup.enter.native="shipNameEnter()" placeholder="船名"></el-input> -->
            <el-select v-model="form.shipName" :remote-method="getShipsList" @change="shipNameChange" filterable clearable remote reserve-keyword placeholder="输入船名搜索">
              <el-option class="custom-select-select" :value="item.shipName" v-for="(item, index) in allShipsList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航次">
            <el-select v-model="form.shipCode" value-key="id" :loading="shipLoading" allow-create clearable filterable @change="shipChange" ref="shipCode" placeholder="航次">
              <el-option :label="item.shipBatch" :value="item" v-for="(item, index) in shipList" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="码头">
            <el-input v-model="form.wharf" placeholder="码头"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="UN码">
            <el-input v-model="form.unCode" placeholder="UN码"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="港区">
            <el-input v-model="form.portArea" placeholder="港区"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="目的港">
            <el-input v-model="form.endPortCode" placeholder="目的港"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="计划靠泊">
            <el-input v-model="form.planBerth" placeholder="计划靠泊"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际靠泊">
            <el-input v-model="form.actualBerth" placeholder="实际靠泊"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计划离泊">
            <el-input v-model="form.planLeaveBerth" placeholder="计划离泊"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际离泊">
            <el-input v-model="form.actualLeaveBerth" placeholder="实际离泊"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="开港时间" class="warn">
            <el-input v-model="form.portStartTime" placeholder="开港时间"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="截港时间" class="warn">
            <el-input v-model="form.portEndTime" placeholder="截港时间"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="截关时间">
            <el-input v-model="form.barrierEndTime" placeholder="截关时间"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="截单时间">
            <el-input v-model="form.endOrderTime" placeholder="截单时间"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="开航时间" class="warn">
            <el-input v-model="form.shipStartTime" placeholder="开航时间"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderThird()">保存</el-button>
      <el-button type="success" icon="fa fa-refresh" @click="getShipInfoNetwork()" :loading="shipButtonLoading">提取船期数据</el-button>
      <el-button type="success" icon="fa fa-download">导出预配数据</el-button>
    </div>
  </div>
</template>

<script>
import { saveOrUpdateOrderThird, getShipInfo, getShipInfoNetwork, getOrderThirdDetail, getShipsList } from "@/api"
import { mapState, mapMutations, mapActions } from "vuex"
export default {
  data() {
    return {
      form: {
        barrierEndTime: "",
        endOrderTime: "",
        endPortCode: "",
        endPortName: "",
        mainDeliveryNumber: "",
        orderNumber: "",
        otherDeliveryNumbers: "",
        portArea: "",
        portEndTime: "",
        portStartTime: "",
        shipCode: "",
        shipName: "",
        shipStartTime: "",
        planBerth: "",
        actualBerth: "",
        planLeaveBerth: "",
        actualLeaveBerth: "",
        unCode: "",
        wharf: ""
      },
      otherDeliveryNumbersList: [],
      shipList: [],
      shipLoading: false,
      shipButtonLoading: false,
      inputVisible: false,
      inputValue: "",
      allShipsList: []
    }
  },
  computed: {
    ...mapState("order", ["orderNumber", "mode"])
  },
  created() {
    if (this.mode == "detail") {
      this.getOrderThirdDetail()
    }
  },
  methods: {
    ...mapMutations("order", ["SET_PORT_START_TIME", "SET_PORT_END_TIME", "SET_SHIP_NAME", "SET_SHIP_CODE", "SET_MAIN_ORDER_NUMBER", "SET_OTHER_ORDER_NUMBER"]),
    saveOrUpdateOrderThird() {
      this.form.otherDeliveryNumbers = this.otherDeliveryNumbersList.join(",")
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        orderNumber: this.orderNumber
      }
      saveOrUpdateOrderThird(params).then(res => {
        this.setState()
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
      })
    },

    handleClose(tag) {
      this.otherDeliveryNumbersList.splice(this.otherDeliveryNumbersList.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.otherDeliveryNumbersList.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ""
    },

    getOrderThirdDetail() {
      let params = {
        orderNumber: this.orderNumber
      }
      getOrderThirdDetail(params).then(res => {
        if (res) {
          this.form = res
          this.otherDeliveryNumbersList = res.otherDeliveryNumbers ? res.otherDeliveryNumbers.split(",") : []
          this.setState()
        }
      })
    },

    getShipsList(e) {
      if (!e || e.length < 3) return
      let params = {
        limit: 20,
        shipName: e
      }
      getShipsList(params).then(res => {
        this.allShipsList = res
      })
    },

    setState() {
      let form = this.form
      this.SET_PORT_START_TIME(form.portStartTime)
      this.SET_PORT_END_TIME(form.portEndTime)
      this.SET_SHIP_NAME(form.shipName)
      this.SET_SHIP_CODE(form.shipCode)
      this.SET_MAIN_ORDER_NUMBER(form.mainDeliveryNumber)
      this.SET_OTHER_ORDER_NUMBER(this.otherDeliveryNumbersList)
    },

    getShipInfo() {
      let params = {
        shipBatch: this.form.shipCode,
        shipName: this.form.shipName
      }
      this.shipLoading = true
      getShipInfo(params)
        .then(res => {
          this.shipList = res
        })
        .finally(() => {
          this.shipLoading = false
        })
    },

    getShipInfoNetwork() {
      if (!this.form.shipName) {
        this.$message.error("请填写船名!")
        return
      }
      let params = {
        shipBatch: this.form.shipCode,
        shipName: this.form.shipName
      }
      this.shipButtonLoading = true
      getShipInfoNetwork(params)
        .then(res => {
          if (this.form.shipCode) {
            if (res.length > 0) {
              let result = res.find(item => {
                return item.shipBatch == this.form.shipCode
              })
              if (result) {
                this.shipChange(result)
              } else {
                this.$message.error("暂无查询结果")
              }
            } else {
              this.$message.error("暂无查询结果")
            }
          } else {
            this.shipList = res
            this.$refs.shipCode.focus()
          }
        })
        .finally(() => {
          this.shipButtonLoading = false
        })
    },

    shipChange(item = {}) {
      this.form.portArea = item.portArea
      this.form.portStartTime = item.openTime
      this.form.portEndTime = item.closeTime
      this.form.shipCode = item.shipBatch
      this.form.planBerth = item.planBerth
      this.form.actualBerth = item.actualBerth
      this.form.planLeaveBerth = item.planLeaveBerth
      this.form.actualLeaveBerth = item.actualLeaveBerth
      this.form.endOrderTime = item.interceptionTime
      this.form.wharf = item.wharf
      this.form.unCode = item.unCode
      this.form.barrierEndTime = ""
      this.form.shipStartTime = item.actualLeaveBerth || item.planLeaveBerth
      this.form.endPortCode = ""

      this.SET_PORT_START_TIME(item.openTime)
      this.SET_PORT_END_TIME(item.closeTime)
    },

    toUpperCase(e, key) {
      this.form[key] = e.toUpperCase()
    },

    shipClear() {
      this.allShipsList = []
      this.shipList = []
      this.shipChange()
    },

    shipNameChange(e) {
      if (e) {
        this.getShipInfo()
        this.$refs.shipCode.focus()
      } else {
        this.shipClear()
      }
    },

    otherDeliveryChange(e) {
      this.form.otherDeliveryNumbers = e.join(",")
    }
  }
}
</script>

<style lang="scss" scoped>
.warn {
  /deep/.el-form-item__label {
    color: red !important;
  }
  /deep/.el-form-item__content {
    .el-input__inner {
      color: red !important;
    }
  }
}

.tags {
  border: 1px solid #dcdfe6;
  height: 32px;
  display: flex;
  align-items: center;
  .el-tag {
    margin-left: 10px;
  }
}

.sub-orders {
  display: flex;
  align-items: center;

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>