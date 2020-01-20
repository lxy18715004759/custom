<template>
  <div class="page table-page">
    <TableFilter :model="form" :columns="columns" :displayColumns.sync="displayColumns" columnsName="goodsColumn" @filter="getProductListPage">
      <template #tools>
        <el-button type="primary" icon="fa fa-plus-square" @click="addItem()">新增</el-button>
        <el-button icon="fa fa-gears">操作</el-button>
        <el-button icon="fa fa-file-pdf-o">导出</el-button>
      </template>
      <template #primary>
        <el-form-item label="产品编号" prop="productCode.value">
          <el-input v-model="form.productCode.value" placeholder="产品编号"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="chineseName.value">
          <el-input v-model="form.chineseName.value" placeholder="产品名称"></el-input>
        </el-form-item>
      </template>
      <template #advanced>
        <el-form-item label="产品编号" prop="productCode.value">
          <el-input v-model="form.productCode.value" placeholder="产品编号"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="chineseName.value">
          <el-input v-model="form.chineseName.value" placeholder="产品名称"></el-input>
        </el-form-item>
      </template>
    </TableFilter>

    <el-table :data="tableData" stripe @row-dblclick="jumpToDetail" v-loading="tableLoading">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column v-for="(item, index) in displayColumns" :key="index" v-bind="item"></el-table-column>
      <el-table-column label="操作" width="90" fixed="right">
        <template v-slot="scope">
          <el-button type="text" @click="deleteConfirm(scope.row.id, scope.$index)">删除</el-button>
          <el-button type="text" @click="copyItem(scope.row.id)">复制</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :pager.sync="pager" @change="getProductListPage"></Pagination>
  </div>
</template>

<script>
import TableFilter from "@/components/TableFilter"
import Pagination from "@/components/Pagination"
import { getProductListPage, deleteProduct } from "@/api"
import { formatDate, filterConvert } from "@/utils"
export default {
  components: {
    TableFilter,
    Pagination
  },
  data() {
    return {
      form: {
        productCode: {
          type: "filter",
          value: ""
        },
        chineseName: {
          type: "filter",
          value: ""
        }
      },
      pager: {
        pageNumber: 1,
        pageSize: 20,
        total: 100
      },
      tableData: [],
      tableLoading: false,
      displayColumns: [],
      columns: [
        {
          prop: "productCode",
          label: "产品编号",
          default: true,
          minWidth: 100,
          disabled: true,
          showOverflowTooltip: true
        },
        {
          prop: "chineseName",
          label: "产品名称",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "customerCode",
          label: "公司代码",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "blackList",
          label: "申报要素",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true,
          formatter: (row, column) => {
            return this.DICT.blackList[row.blackList]
          }
        },
        {
          prop: "countryCode",
          label: "状态",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "createdTime",
          label: "创建时间",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true,
          formatter: (row, column) => {
            return formatDate(row.createdTime)
          }
        }
      ]
    }
  },
  created() {
    this.getProductListPage()
  },
  mounted() {},
  methods: {
    getProductListPage() {
      let params = {
        ...this.pager,
        ...filterConvert(this.form)
      }
      this.tableLoading = true
      getProductListPage(params)
        .then(res => {
          this.tableLoading = false
          this.tableData = res.records
          this.pager.total = res.total
        })
        .catch(res => {})
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
          this.deleteProduct(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    // 删除
    deleteProduct(id, index) {
      let params = { id }
      deleteProduct(params).then(res => {
        this.tableData.splice(index, 1)
        this.$notify.success({
          title: "成功",
          message: "删除成功！"
        })
      })
    },
    addItem() {
      this.$router.push("/daily/goods/add")
    },
    copyItem(id) {
      this.$router.push(`/daily/goods/add?copyFrom=${id}`)
    },
    jumpToDetail(row) {
      this.$router.push(`/daily/goods/detail/${row.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>