<template>
  <div class="spec">
    <el-form>
      <div class="row" v-for="(item, index) in list" :key="index">
        <el-form-item label="箱型">
          <el-select v-model="item.boxType" default-first-option placeholder="箱型" filterable>
            <el-option :label="item" :value="item" v-for="(item, index) in DICT.boxType" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="箱量">
          <el-input v-model="item.boxNumber" placeholder="箱量"></el-input>
        </el-form-item>
        <el-form-item label="箱内件数">
          <el-input v-model="item.pieceNumber" placeholder="箱内件数"></el-input>
        </el-form-item>
        <el-form-item label="箱重量">
          <el-input placeholder="箱重量" v-model="item.weightNumber">
            <template slot="append">{{item.weightUnit}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="箱体积">
          <el-input placeholder="箱体积" v-model="item.volumeNumber">
            <template slot="append">{{item.volumeUnit}}</template>
          </el-input>
        </el-form-item>
        <div class="edit" @click="add()" v-if="index == 0">
          <i class="el-icon-plus"></i>
        </div>
        <div class="edit" @click="remove(index)" v-else>
          <i class="el-icon-minus"></i>
        </div>
      </div>
    </el-form>

    <div class="row total" v-if="list && list.length > 0">
      <span>箱型箱量总计</span>

      <div class="sum">
        <div class="item" v-for="(item, index) in list" :key="index">
          {{item.boxType}} × {{item.boxNumber}}
          <span v-if="index < list.length - 1">+</span>
        </div>
      </div>
    </div>
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
        appId: this.GLOBAL.appId,
        boxNumber: "",
        boxType: "",
        pieceNumber: "",
        volumeNumber: "",
        volumeUnit: "CBM",
        weightNumber: "",
        weightUnit: "KGS"
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