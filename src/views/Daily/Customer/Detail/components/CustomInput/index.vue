<template>
  <el-form :model="form" label-width="40px">
    <el-form-item label="信息">
      <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.user" placeholder="收发通信息粘贴到此处"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      form: {},
      radio: 3,
      date: ""
    }
  },
  mounted() {
    this.add()
  },
  methods: {
    add() {
      this.list.push({
        type: "",
        count: "",
        piece: "",
        weight: "",
        size: ""
      })
    },
    remove(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #eaeef2;
  padding: 6px 12px;
  margin-bottom: 12px;
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
  }
}
.el-form {
  &-item {
    flex: 1;
    margin-bottom: 0;
    margin-right: 5px;
  }
  .el-select {
    width: 100%;
  }
}
</style>