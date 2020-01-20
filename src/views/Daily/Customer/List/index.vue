<template>
  <div class="page table-page">
    <TableFilter :model="form" :columns="columns" :displayColumns.sync="displayColumns" columnsName="customerColumn" @filter="getCustomerListPage">
      <template #tools>
        <el-button type="primary" icon="fa fa-plus-square" @click="addItem()">新增</el-button>
        <el-button icon="fa fa-gears">操作</el-button>
        <el-button icon="fa fa-file-pdf-o">导出</el-button>
      </template>
      <template #primary>
        <el-form-item label="客户名称" prop="chineseName.value">
          <el-input v-model="form.chineseName.value" placeholder="客户名称"></el-input>
        </el-form-item>
      </template>

      <template #advanced>
        <el-form-item label="客户名称" prop="chineseName.value">
          <el-input v-model="form.chineseName.value" placeholder="客户名称"></el-input>
        </el-form-item>
      </template>
    </TableFilter>

    <el-table :data="tableData" stripe @row-dblclick="jumpToDetail">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column v-for="(item, index) in displayColumns" :key="index" v-bind="item"></el-table-column>
      <el-table-column label="操作" width="90" fixed="right">
        <template v-slot="scope">
          <el-button type="text" @click="deleteConfirm(scope.row.id, scope.$index)">删除</el-button>
          <el-button type="text" @click="copyItem(scope.row.id)">复制</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :pager.sync="pager" @change="getCustomerListPage"></Pagination>
  </div>
</template>

<script>
import TableFilter from "@/components/TableFilter"
import Pagination from "@/components/Pagination"

import { getCustomerListPage, deleteCustomer } from "@/api"
import { filterConvert } from "@/utils"

export default {
  components: {
    TableFilter,
    Pagination
  },
  data() {
    return {
      form: {
        keywords: {
          type: "keywords",
          value: ""
        },
        chineseName: {
          type: "filter",
          value: ""
        }
      },
      pager: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      displayColumns: [],
      columns: [
        {
          prop: "customerCode",
          label: "客户代码",
          default: true,
          minWidth: 100,
          disabled: true,
          showOverflowTooltip: true
        },
        {
          prop: "chineseName",
          label: "中文名称",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "customerSimpleName",
          label: "中文简称",
          default: true,
          minWidth: 120,
          showOverflowTooltip: true
        },
        {
          prop: "customerType",
          label: "客户类型",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "blackList",
          label: "是否黑名单",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true,
          formatter: (row, column) => {
            return this.DICT.blackList[row.blackList]
          }
        },
        {
          prop: "countryCode",
          label: "国家",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "createdTime",
          label: "创建时间",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        }
      ]
    }
  },
  mounted() {
    this.getCustomerListPage()
  },
  methods: {
    // 访客首页数据
    getCustomerListPage() {
      let params = {
        ...this.pager,
        ...filterConvert(this.form)
      }
      getCustomerListPage(params)
        .then(res => {
          console.log(res)
          this.tableData = res.records
          this.pager.total = res.total
        })
        .catch(res => {})
    },

    // 删除二次确认
    deleteConfirm(id, index) {
      this.$confirm("确认删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCustomer(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    // 删除
    deleteCustomer(id, index) {
      let params = { id }
      deleteCustomer(params).then(res => {
        this.tableData.splice(index, 1)
        this.$notify.success({
          title: "成功",
          message: "删除成功！"
        })
      })
    },

    addItem() {
      this.$router.push("/daily/customer/add")
    },
    copyItem(id) {
      this.$router.push(`/daily/customer/add?copyFrom=${id}`)
    },
    jumpToDetail(row) {
      this.$router.push(`/daily/customer/detail/${row.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>