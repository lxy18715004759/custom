<template>
  <div class="page table-page">
    <TableFilter :model="form" :columns="columns" :displayColumns.sync="displayColumns" columnsName="orderColumn" @filter="getOrderTotalListPage">
      <template #tools>
        <el-button type="primary" icon="fa fa-plus-square" @click="addItem()">新增</el-button>
        <el-button icon="fa fa-gears">操作</el-button>
        <el-button icon="fa fa-file-pdf-o">导出</el-button>
      </template>
      <template #primary>
        <el-form-item label="客户名称" prop="customerId.value">
          <el-select v-model="form.customerId.value" filterable :filter-method="customerCodeFilter" clearable default-first-option placeholder="客户名称">
            <el-option class="custom-select-select" :label="item.chineseName" :value="item.id" v-for="(item, index) in customerCode(customerKeyword)" :key="item.customerCode">
              <span class="custom-select-name">{{item.chineseName}}</span>
              <span class="custom-select-code">{{item.customerCode}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售" prop="saleName.value">
          <el-input v-model="form.saleName.value" placeholder="销售"></el-input>
        </el-form-item>
        <el-form-item label="客服" prop="serviceName.value">
          <el-input v-model="form.serviceName.value" placeholder="客服"></el-input>
        </el-form-item>
        <el-form-item label="目的港" prop="endPortName.value">
          <el-input v-model="form.endPortName.value" placeholder="目的港"></el-input>
        </el-form-item>
        <el-form-item label="起航日期" prop="shipStartTime.value">
          <el-date-picker v-model="form.shipStartTime.value" type="daterange" value-format="yyyy-MM-dd" placeholder="选择日期" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </template>

      <template #advanced>
        <el-form-item label="客户名称" prop="customerId.value">
          <el-select v-model="form.customerId.value" filterable :filter-method="customerCodeFilter" clearable default-first-option placeholder="客户名称">
            <el-option class="custom-select-select" :label="item.chineseName" :value="item.id" v-for="(item, index) in customerCode(customerKeyword)" :key="item.customerCode">
              <span class="custom-select-name">{{item.chineseName}}</span>
              <span class="custom-select-code">{{item.customerCode}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售" prop="saleName.value">
          <el-input v-model="form.saleName.value" placeholder="销售"></el-input>
        </el-form-item>
        <el-form-item label="客服" prop="serviceName.value">
          <el-input v-model="form.serviceName.value" placeholder="客服"></el-input>
        </el-form-item>
        <el-form-item label="目的港" prop="endPortName.value">
          <el-input v-model="form.endPortName.value" placeholder="目的港"></el-input>
        </el-form-item>
        <el-form-item label="起航日期" prop="shipStartTime.value">
          <el-date-picker v-model="form.shipStartTime.value" type="daterange" value-format="timestamp" placeholder="选择日期" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </template>
    </TableFilter>

    <el-table :data="tableData" stripe v-loading="tableLoading" @row-dblclick="jumpToOrderDetail">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column v-for="(item, index) in displayColumns" :key="index" v-bind="item"></el-table-column>
      <el-table-column label="操作" width="60" fixed="right">
        <template v-slot="scope">
          <el-button type="text" @click="deleteConfirm(scope.row.id, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :pager.sync="pager" @change="getOrderTotalListPage"></Pagination>
  </div>
</template>

<script>
import TableFilter from "@/components/TableFilter"
import Pagination from "@/components/Pagination"
import { getOrderTotalListPage, deleteOrderTotal } from "@/api"
import { formatDate, filterConvert } from "@/utils"
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    TableFilter,
    Pagination
  },
  data() {
    return {
      form: {
        customerId: {
          type: "filter",
          value: ""
        },
        serviceName: {
          type: "filter",
          value: ""
        },
        saleName: {
          type: "filter",
          value: ""
        },
        endPortName: {
          type: "filter",
          value: ""
        },
        shipStartTime: {
          type: "range",
          value: ""
        }
      },
      pager: {
        pageNumber: 1,
        pageSize: 20,
        total: 100
      },
      displayColumns: [],
      columns: [
        {
          prop: "orderNumber",
          label: "订单编号",
          default: true,
          minWidth: 140,
          disabled: true,
          showOverflowTooltip: true
        },
        {
          prop: "orderType",
          label: "订单类型",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "customerName",
          label: "客户名称",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "otherDeliveryNumbers",
          label: "拼单号",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "saleName",
          label: "销售名称",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "serviceName",
          label: "客服名称",
          default: false,
          minWidth: 140,
          showOverflowTooltip: true
        }
      ],
      tableData: [],
      customerKeyword: "",
      tableLoading: false
    }
  },
  computed: {
    ...mapGetters("dict", ["customerCode"])
  },
  mounted() {
    this.getSimpleCustomerRo()
    this.getOrderTotalListPage()
  },
  methods: {
    ...mapActions("dict", ["getSimpleCustomerRo"]),
    addItem() {
      this.$router.push("/daily/order/add")
    },
    jumpToOrderDetail(row) {
      console.log(row)
      this.$router.push(`/daily/order/detail/${row.orderNumber}`)
    },
    getOrderTotalListPage() {
      let params = {
        ...this.pager,
        ...filterConvert(this.form)
      }
      this.tableLoading = true
      getOrderTotalListPage(params).then(res => {
        this.tableLoading = false
        this.tableData = res.records
        this.pager.total = res.total
      })
    },

    // 删除二次确认
    deleteConfirm(id, index) {
      console.log(index)
      this.$confirm("确认删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteOrderTotal(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },
    // 删除
    deleteOrderTotal(id, index) {
      let params = { id }
      deleteOrderTotal(params).then(res => {
        this.tableData.splice(index, 1)
        this.$notify.success({
          title: "成功",
          message: "删除成功！"
        })
      })
    },

    customerCodeFilter(e = "") {
      this.customerKeyword = e
    }
  }
}
</script>

<style lang="scss" scoped>
</style>