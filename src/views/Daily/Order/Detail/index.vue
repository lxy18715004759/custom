<template>
  <div class="page">
    <el-collapse class="collapse" v-model="activeName">
      <el-collapse-item :name="1">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-file-text-o fa-fw"></i>
            <span>基础数据</span>
          </div>

          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderBasic></OrderBasic>
      </el-collapse-item>

      <el-collapse-item :name="2">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-th-large fa-fw"></i>
            <span>货物数据</span>
          </div>
          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderCargo></OrderCargo>
      </el-collapse-item>

      <el-collapse-item :name="3">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-newspaper-o fa-fw"></i>
            <span>预配信息</span>
          </div>
          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderPreset></OrderPreset>
      </el-collapse-item>

      <el-collapse-item :name="4">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-truck fa-fw"></i>
            <span>车队信息</span>
          </div>
          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderFleet></OrderFleet>
      </el-collapse-item>

      <el-collapse-item :name="5">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-certificate fa-fw"></i>
            <span>提单样本</span>
          </div>
          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderSample :active="isActive(5)"></OrderSample>
      </el-collapse-item>

      <el-collapse-item :name="6">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-table fa-fw"></i>
            <span>舱单表格</span>
          </div>
          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderManifest :active="isActive(6)"></OrderManifest>
      </el-collapse-item>

      <el-collapse-item :name="7">
        <template slot="title">
          <div class="title">
            <i class="header-icon fa fa-anchor fa-fw"></i>
            <span>VGM</span>
          </div>
          <em v-if="orderNumber">订单编号：{{orderNumber}}</em>
        </template>
        <OrderVgm></OrderVgm>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import OrderBasic from "./components/OrderBasic"
import OrderCargo from "./components/OrderCargo"
import OrderPreset from "./components/OrderPreset"
import OrderFleet from "./components/OrderFleet"
import OrderSample from "./components/OrderSample"
import OrderManifest from "./components/OrderManifest"
import OrderVgm from "./components/OrderVgm"

import { mapMutations, mapState } from "vuex"
export default {
  components: {
    OrderBasic,
    OrderCargo,
    OrderPreset,
    OrderFleet,
    OrderSample,
    OrderManifest,
    OrderVgm
  },
  data() {
    return {
      activeName: [1]
    }
  },
  computed: {
    ...mapState("order", ["orderNumber"]),
    mode() {
      let path = this.$route.path
      if (path.includes("/add")) {
        return "add"
      } else if (path.includes("/detail")) {
        return "detail"
      }
    }
  },
  created() {
    if (this.mode == "detail") {
      this.SET_ORDER_NUMBER(this.$route.params.id)
    }
    this.SET_MODE(this.mode)
  },
  beforeDestroy() {
    this.RESET_ORDER_STATE()
  },
  methods: {
    ...mapMutations("order", ["SET_ORDER_NUMBER", "SET_MODE", "RESET_ORDER_STATE"]),
    isActive(num) {
      return this.activeName.includes(num)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: flex-start;

  .collapse {
    // 通用表单样式
    /deep/.el-form {
      .el-col {
        .el-select {
          width: 100%;
        }
        .el-form-item {
          margin-bottom: 10px;
          &.inherit-item {
            .el-form-item__label {
              color: #12a294;
              font-weight: 600;
              font-style: italic;
            }
          }
          .el-form-item__label {
            border: 1px solid #dcdfe6;
            border-right: 0;
            line-height: 30px;
            padding: 0 6px;
            color: #222;
            background: #fff;
          }
          .el-input__inner {
            border-radius: 0;
          }

          .el-form-item__content {
            vertical-align: middle;
            overflow: hidden;
            .el-radio-group {
              width: 100%;
              height: 32px;
              border: 1px solid #dcdfe6;
              padding-left: 10px;
              white-space: nowrap;
              margin-top: -2px;
              .el-radio {
                height: 100%;
                line-height: 26px;
              }
            }
            .el-input-group {
              .el-input-group__prepend {
                border-radius: 0;
              }
              .el-input-group__append {
                border-radius: 0;
              }
              .el-input--suffix {
                width: 80px;
              }
            }
          }
        }
      }
      .el-row {
        .el-col:not(:first-child) {
          .el-form-item__label {
            border-left: none;
          }
        }

        // 两端圆角
        .el-col:first-child {
          .el-form-item {
            &__label {
              border-radius: 3px 0 0 3px;
            }
          }
        }
        .el-col:last-child {
          .el-form-item {
            .el-input {
              &__inner {
                border-radius: 0 3px 3px 0;
              }
            }
          }
        }
      }
    }
  }
}

// 过渡动画 横向渐变
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all 0.5s;
}
.fade-transverse-enter,
.fade-transverse-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.collapse {
  width: 100%;
  border-bottom: none;
  /deep/.el-collapse-item {
    margin-bottom: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    &__wrap {
      padding: 0 16px;
    }
    &__header {
      font-size: 14px;
      font-weight: 500;
      background: #2e5684;
      color: #fff;
      padding: 0 10px;
      height: 36px;
      border-bottom: none;
      .header-icon {
        margin-right: 6px;
        font-size: 16px;
      }

      .title {
        min-width: 150px;
      }

      em {
        margin-left: 20px;
      }
    }
    &__content {
      padding: 20px 0;
    }
  }
}
</style>