<template>
  <div class="spec">
    <el-form>
      <div class="row" v-for="(item, index) in list" :key="index">
        <el-form-item label="车牌号">
          <el-input v-model="item.carNumber" placeholder="车牌号"></el-input>
        </el-form-item>

        <el-form-item label="驾驶员">
          <el-input v-model="item.driverName" placeholder="驾驶员"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="item.driverPhone" placeholder="驾驶员手机号"></el-input>
        </el-form-item>

        <el-form-item label="箱型">
          <el-select v-model="item.boxType" default-first-option placeholder="箱型" filterable>
            <el-option :label="item" :value="item" v-for="(item, index) in DICT.boxType" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="箱号">
          <el-input v-model="item.boxNumber" placeholder="箱号"></el-input>
        </el-form-item>
        <el-form-item label="封号">
          <el-input v-model="item.closeNumber" placeholder="封号"></el-input>
        </el-form-item>

        <div class="button"></div>
        <el-dropdown split-button type="primary">
          导出箱单
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看图片</el-dropdown-item>
            <el-dropdown-item>上传图片</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button type="primary">查看图片</el-button>
        <el-button type="primary">导出箱单</el-button>-->

        <div class="edit" @click="add()" v-if="index == 0">
          <i class="el-icon-plus"></i>
        </div>
        <div class="edit" @click="remove(index)" v-else>
          <i class="el-icon-minus"></i>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue, oldValue) {
        this.list = newValue
        if (newValue.length == 0) {
          this.add()
        }
      }
    },
    list: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue)
      }
    }
  },
  created() {
    if (this.mode == "add") {
      this.add()
    }
  },
  methods: {
    add() {
      this.list.push({
        boxNumber: "",
        boxType: "",
        carNumber: "",
        closeNumber: "",
        driverName: "",
        driverPhone: "",
        orderNumber: ""
      })
    },
    remove(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
// 通用表单样式
.spec {
  .row {
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #dbe5f0;
    padding: 6px 12px;
    margin-bottom: 5px;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;

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
      margin-left: 10px;
    }
  }

  /deep/.el-form {
    .el-form-item {
      margin-right: 5px;
      margin-bottom: 0;
      flex: 1;
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