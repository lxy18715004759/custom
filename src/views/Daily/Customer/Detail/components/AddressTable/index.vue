<template>
  <div class="contacts">
    <el-table :data="tableData" v-loading="tableLoading" stripe>
      <el-table-column prop="peopleName" label="联系人" min-width="120"></el-table-column>
      <el-table-column prop="unitName" label="单位名称" min-width="120"></el-table-column>
      <el-table-column label="类型" min-width="220" :filters="typeFilters" :filter-method="filterTag">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.accept">收货人</el-tag>
          <el-tag type="info" v-if="scope.row.send">发货人</el-tag>
          <el-tag type="danger" v-if="scope.row.notice">通知人</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="座机号" min-width="120"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" min-width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="140"></el-table-column>
      <el-table-column prop="qq" label="QQ号" min-width="120"></el-table-column>
      <el-table-column prop="weixin" label="微信号" min-width="120"></el-table-column>
      <el-table-column prop="address" label="联系地址" min-width="180"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150"></el-table-column>
      <el-table-column align="right" fixed="right" width="220">
        <template slot="header">
          <el-button type="primary" size="mini" @click="showFormModal('add')">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="showFormModal('edit', scope.row,scope.$index)">编辑</el-button>
          <el-button size="mini" @click="showFormModal('copy', scope.row,scope.$index)">复制</el-button>
          <el-button size="mini" type="danger" @click="deleteConfirm(scope.row.id,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="modalTitle[modalType]+companyName" :visible.sync="dialogVisible" @close="initForm()">
      <el-form :model="form" label-width="70px" ref="form">
        <el-form-item label="联系人" prop="peopleName">
          <el-input v-model="form.peopleName" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="英文名" prop="englishName">
          <el-input v-model="form.englishName" placeholder="英文名"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="form.unitName" placeholder="单位名称"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop>
          <el-checkbox label="收货人" v-model="form.accept" :true-label="1" :false-label="0"></el-checkbox>
          <el-checkbox label="发货人" v-model="form.send" :true-label="1" :false-label="0"></el-checkbox>
          <el-checkbox label="通知人" v-model="form.notice" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item label="座机号" prop="telephone">
          <el-input v-model="form.telephone" placeholder="座机号"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="qq">
          <el-input v-model="form.qq" placeholder="QQ号"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="weixin">
          <el-input v-model="form.weixin" placeholder="微信号"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address" placeholder="联系地址"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal()">取 消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="saveForm(modalType)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCustomerUnit, addCustomerUnit, updateCustomerUnit, deleteCustomerUnit } from "@/api"
import { mapState } from "vuex"
class FormModel {
  address = ""
  email = ""
  peopleName = ""
  englishName = ""
  phoneNumber = ""
  qq = ""
  remark = ""
  telephone = ""
  types = ""
  unitName = ""
  weixin = ""
  accept = 0
  notice = 0
  send = 0
}
export default {
  data() {
    return {
      form: {},
      typesCheckList: [],
      dialogVisible: false,
      tableData: [],
      modalType: "",
      modalTitle: {
        add: "添加收发通信息",
        edit: "修改收发通信息"
      },
      editIndex: 0,
      tableLoading: false,
      buttonLoading: false,
      typeFilters: [{ text: "收货人", value: "accept" }, { text: "发货人", value: "send" }, { text: "通知人", value: "notice" }]
    }
  },

  computed: {
    ...mapState("customerDetail", ["mode", "customerId", "companyName"])
  },
  created() {
    if (this.mode == "detail") {
      this.getCustomerUnit()
    }
    this.initForm()
  },
  mounted() {},
  methods: {
    initForm() {
      this.form = new FormModel()
    },
    // 打开表单弹窗
    showFormModal(type, row, index) {
      if (!this.customerId) {
        this.$notify.error({
          title: "错误",
          message: "请先填写基本信息并保存"
        })
        return
      }
      if (type == "edit") {
        this.form = { ...row }
        this.editIndex = index
      }
      if (type == "copy") {
        type = "add"
        delete row.id
        this.form = { ...row }
      }
      this.modalType = type
      this.dialogVisible = true
    },

    getCustomerUnit() {
      let params = {
        customerId: this.customerId
      }
      this.tableLoading = true
      getCustomerUnit(params).then(res => {
        this.tableLoading = false
        this.tableData = res
      })
    },

    // 新增
    addCustomerUnit() {
      let params = {
        appId: this.GLOBAL.appId,
        customerId: this.customerId,
        ...this.form
      }
      this.buttonLoading = true
      addCustomerUnit(params)
        .then(res => {
          this.buttonLoading = false
          this.tableData.push(res)
          this.$notify.success({
            title: "成功",
            message: "添加成功！"
          })
          this.closeModal()
        })
        .catch(err => {
          this.buttonLoading = false
        })
    },

    // 修改
    updateCustomerUnit() {
      let params = {
        appId: this.GLOBAL.appId,
        customerId: this.customerId,
        ...this.form
      }
      this.buttonLoading = true
      updateCustomerUnit(params)
        .then(res => {
          this.buttonLoading = false
          this.tableData.splice(this.editIndex, 1, res)
          this.$notify.success({
            title: "成功",
            message: "保存成功！"
          })
          this.closeModal()
        })
        .catch(err => {
          this.buttonLoading = false
        })
    },

    // 删除二次确认
    deleteConfirm(id, index) {
      this.$confirm("确认删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCustomerUnit(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    // 删除
    deleteCustomerUnit(id, index) {
      let params = { id }
      deleteCustomerUnit(params).then(res => {
        this.tableData.splice(index, 1)
        this.$notify.success({
          title: "成功",
          message: "删除成功！"
        })
      })
    },

    // 弹窗确认按钮 新增 或修改
    saveForm(type) {
      if (type == "add") {
        this.addCustomerUnit()
      } else {
        this.updateCustomerUnit()
      }
    },

    // 关闭弹窗
    closeModal() {
      this.initForm()
      this.typesCheckList = []
      this.dialogVisible = false
    },

    typesCheckChange(e) {
      this.form.types = e.join(",")
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    filterTag(value, row) {
      console.log(value)
      return row[value] == 1
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 5px;
}
</style>
