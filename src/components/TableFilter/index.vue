<template>
  <div class="filter">
    <div class="tools">
      <el-button-group>
        <slot name="tools"></slot>
      </el-button-group>
      <div class="settings">
        <div class="item" @click="showHeader = true">
          <i class="fa fa-table"></i>
          <span>表头指标</span>
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="item" @click="showFilter = true">
          <i class="fa fa-filter"></i>
          <span>高级筛选</span>
        </div>
      </div>
    </div>

    <div class="primary-form">
      <el-form ref="form" inline :model="model" @submit.native.prevent @keyup.enter.native="filter()">
        <slot name="primary"></slot>
      </el-form>
      <div class="buttons">
        <el-button type="primary" @click="filter()" icon="fa fa-search">查询</el-button>
        <el-button @click="reset()" icon="fa fa-undo">重置</el-button>
      </div>
    </div>

    <el-drawer class="drawer" title="高级筛选" size="320px" :visible.sync="showFilter" direction="rtl">
      <div class="advanced">
        <div class="advanced-filter">
          <el-form ref="form" label-position="top" :model="model" @submit.native.prevent @keyup.enter.native="filter()">
            <slot name="advanced"></slot>
          </el-form>
        </div>
        <div class="buttons">
          <el-button type="primary" @click="filter()" icon="fa fa-search">查询</el-button>
          <el-button @click="reset()" icon="fa fa-undo">重置</el-button>
        </div>
      </div>
    </el-drawer>

    <el-drawer class="drawer" title="表头设置" size="320px" :visible.sync="showHeader" direction="rtl">
      <div class="header">
        <div class="header-filter">
          <el-checkbox-group v-model="checkedKeys" @change="setCheckedColumns">
            <el-checkbox v-for="(item,index) in columns" :disabled="item.disabled" :label="item.prop" :key="index">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="buttons">
          <el-button type="primary" @click="saveColumns()">确定</el-button>
          <el-button @click="showHeader = false">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    },
    // 全部字段
    columns: {
      type: Array,
      default: () => []
    },
    // 存在localstorage中的key
    columnsName: {
      type: String,
      default: ""
    }
  },
  computed: {
    // 默认字段
    defaultData() {
      return this.columns.filter(item => {
        return item.default
      })
    },
    // 默认选中字段
    defaultCheckedNameList() {
      return this.defaultData.map(item => {
        return item.prop
      })
    }
  },
  data() {
    return {
      showFilter: false,
      showHeader: false,
      // 选中的表头数据
      checkedColumns: [],
      // 选中的表头key
      checkedKeys: []
    }
  },

  mounted() {
    this.setDefaultDisplayColumns()
  },

  methods: {
    reset() {
      this.$refs.form.resetFields()
      this.$emit("filter")
    },

    filter() {
      this.$emit("filter")
      this.showFilter = false
    },

    // 设置已缓存或默认显示字段
    setDefaultDisplayColumns() {
      let storedList = JSON.parse(localStorage.getItem(this.columnsName))
      let availableKeys = []
      if (storedList && storedList.length > 0) {
        // 剔除表头 没有的字段
        let allkeys = this.columns.map(item => {
          return item.prop
        })
        availableKeys = storedList.filter(item => {
          return allkeys.includes(item)
        })
      }

      if (availableKeys && availableKeys.length > 0) {
        this.setCheckedColumns(availableKeys)
        this.checkedKeys = availableKeys
      } else {
        this.checkedColumns = this.defaultData
        this.checkedKeys = this.defaultCheckedNameList
      }
      this.saveColumns()
    },

    // 保存数据
    saveColumns() {
      this.showHeader = false
      this.$emit("update:displayColumns", this.checkedColumns)
      localStorage.setItem(this.columnsName, JSON.stringify(this.checkedKeys))
    },

    // 设置已选中字段数据
    setCheckedColumns(checkList) {
      this.checkedColumns = []
      this.columns.forEach(item => {
        checkList.forEach(element => {
          if (element == item.prop) {
            this.checkedColumns.push(item)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  .primary-form {
    position: relative;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 10px 0 0 10px;
    margin-bottom: 10px;
    padding-right: 120px;
    /deep/ .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-input__inner {
          width: 150px;
        }
        .el-date-editor {
          width: 240px;
        }
      }
    }
    .buttons {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .settings {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .item {
        // margin-bottom: 18px;
        white-space: nowrap;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        i {
          margin-right: 6px;
          color: #666;
        }
      }
    }
  }
}

.drawer {
  /deep/.el-drawer {
    &__header {
      font-size: 16px;
      color: #000;
      font-weight: 500;
    }
    &__body {
      height: 0;
    }
  }

  // 高级查询
  .advanced {
    height: 100%;
    display: flex;
    flex-direction: column;

    &-filter {
      padding: 0 12px;
      height: 0;
      flex: 1;
      overflow-y: auto;

      /deep/.el-form {
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          &.el-input {
            width: 100%;
          }
        }

        .el-form-item__label {
          padding: 0;
        }
      }
    }
    .buttons {
      padding: 12px 12px 24px;
      text-align: center;
    }
  }

  // 表头设置
  .header {
    height: 100%;
    display: flex;
    flex-direction: column;

    &-filter {
      padding: 0 12px;
      height: 0;
      flex: 1;
      overflow-y: auto;

      /deep/ .el-checkbox-group {
        .el-checkbox {
          width: 50%;
          margin-bottom: 10px;
          margin-right: 0;
        }
      }
    }
    .buttons {
      padding: 12px 12px 24px;
      text-align: center;
    }
  }
}
</style>