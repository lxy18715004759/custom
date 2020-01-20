<template>
  <div class="finace">
    <el-table :data="tableData" v-loading="tableLoading" stripe>
      <el-table-column prop="bankName" label="银行户名" min-width="80"></el-table-column>
      <el-table-column prop="bankType" label="开户行" min-width="80"></el-table-column>
      <el-table-column prop="bankAccount" label="银行账号" min-width="80"></el-table-column>
      <el-table-column prop="moneyType" label="币种" min-width="80"></el-table-column>
      <el-table-column align="right" width="220">
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
      <el-form :model="form" label-width="90px" ref="form">
        <el-form-item label="银行户名" prop="bankName">
          <el-input v-model="form.bankName" placeholder="银行户名"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bankType">
          <el-input v-model="form.bankType" placeholder="请输入开户行（支行）"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="银行账号"></el-input>
        </el-form-item>
        <el-form-item label="币种" prop="moneyType">
          <el-select filterable :filter-method="moneyCodeFilter" clearable default-first-option v-model="form.moneyType" placeholder="输入币种名或代码">
            <el-option class="custom-select" :label="item.name" :value="item.code" v-for="(item, index) in moneyCodeList" :key="item.code">
              <span class="custom-select-name">{{item.name}}</span>
              <span class="custom-select-code">{{item.code}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="财务联系人" prop="contact">
          <el-input v-model="form.contact" placeholder="银行账号"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="银行账号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="银行账号"></el-input>
        </el-form-item>
        <el-form-item label="发票类型" prop="invoiceType">
          <el-radio-group v-model="form.invoiceType">
            <el-radio label="电子发票">电子发票</el-radio>
            <el-radio label="纸质发票">纸质发票</el-radio>
          </el-radio-group>
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
import { mapGetters, mapState, mapActions } from "vuex"
import { addCustomerPayInfo, updateCustomerPayInfo, deleteCustomerPayInfo, getCustomerPayInfo } from "@/api"
class FormModel {
  bankAccount = ""
  bankName = ""
  bankType = ""
  moneyType = ""
  contact = ""
  phone = ""
  email = ""
  invoiceType = ""
}
export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
      tableData: [],
      keyword: "",
      modalType: "",
      modalTitle: {
        add: "添加银行信息",
        edit: "修改银行信息"
      },
      editIndex: 0,
      buttonLoading: false,
      tableLoading: false
    }
  },
  computed: {
    ...mapGetters("dict", ["moneyCode"]),
    ...mapState("customerDetail", ["mode", "customerId", "companyName"]),
    moneyCodeList() {
      return this.moneyCode(this.keyword)
    }
  },
  created() {
    this.getMoneyCodeInCustomer()
    if (this.mode == "detail") {
      this.getCustomerPayInfo()
    }
    this.initForm()
  },
  mounted() {},
  methods: {
    ...mapActions("dict", ["getMoneyCodeInCustomer"]),
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

    getCustomerPayInfo() {
      let params = {
        customerId: this.customerId
      }
      this.tableLoading = true
      getCustomerPayInfo(params).then(res => {
        this.tableLoading = false
        this.tableData = res
      })
    },

    // 新增财务信息
    addCustomerPayInfo() {
      let params = {
        appId: this.GLOBAL.appId,
        customerId: this.customerId,
        ...this.form
      }
      this.buttonLoading = true
      addCustomerPayInfo(params)
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

    // 修改财务信息
    updateCustomerPayInfo() {
      let params = {
        appId: this.GLOBAL.appId,
        customerId: this.customerId,
        ...this.form
      }
      this.buttonLoading = true
      updateCustomerPayInfo(params)
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
          this.deleteCustomerPayInfo(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    // 删除财务信息
    deleteCustomerPayInfo(id, index) {
      let params = { id }
      deleteCustomerPayInfo(params).then(res => {
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
        this.addCustomerPayInfo()
      } else {
        this.updateCustomerPayInfo()
      }
    },

    // 关闭弹窗
    closeModal() {
      this.initForm()
      this.dialogVisible = false
    },
    // 币种下拉筛选
    moneyCodeFilter(e) {
      this.keyword = e
    }
  }
}
</script>

<style lang="scss" scoped>
</style>