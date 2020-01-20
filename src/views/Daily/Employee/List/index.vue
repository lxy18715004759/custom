<template>
  <div class="page table-page">
    <TableFilter :model="form" :columns="columns" :displayColumns.sync="displayColumns" columnsName="employeeColumn" @filter="getEmployeeListPage">
      <template #tools>
        <el-button type="primary" icon="fa fa-plus-square" @click="addItem()">新增</el-button>
        <el-button icon="fa fa-gears">操作</el-button>
        <el-button icon="fa fa-file-pdf-o">导出</el-button>
      </template>
      <template #primary>
        <el-form-item label="员工姓名" prop="nickName.value">
          <el-input v-model="form.nickName.value" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber.value">
          <el-input v-model="form.phoneNumber.value" placeholder="手机号"></el-input>
        </el-form-item>
      </template>
      <template #advanced>
        <el-form-item label="员工姓名" prop="nickName.value">
          <el-input v-model="form.nickName.value" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber.value">
          <el-input v-model="form.phoneNumber.value" placeholder="手机号"></el-input>
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

    <Pagination :pager.sync="pager" @change="getEmployeeListPage"></Pagination>
  </div>
</template>

<script>
import TableFilter from "@/components/TableFilter"
import Pagination from "@/components/Pagination"
import { getEmployeeListPage, deleteUser } from "@/api"
import { formatDate, filterConvert } from "@/utils"
import { mapState } from "vuex"
export default {
  components: {
    TableFilter,
    Pagination
  },
  data() {
    return {
      form: {
        nickName: {
          type: "filter",
          value: ""
        },
        phoneNumber: {
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
          prop: "nickName",
          label: "员工姓名",
          default: true,
          minWidth: 140,
          disabled: true,
          showOverflowTooltip: true
        },
        {
          prop: "username",
          label: "用户名",
          default: true,
          minWidth: 100,
          showOverflowTooltip: true
        },

        {
          prop: "phoneNumber",
          label: "手机号",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true
        },
        {
          prop: "sex",
          label: "性别",
          default: true,
          minWidth: 140,
          showOverflowTooltip: true,
          formatter: (row, column) => {
            return this.DICT.gender[row.sex]
          }
        },
        {
          prop: "email",
          label: "邮箱",
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
  computed: {
    ...mapState("user", ["companyCode"])
  },
  created() {
    this.getEmployeeListPage()
  },
  mounted() {},
  methods: {
    getEmployeeListPage() {
      let params = {
        ...this.pager,
        ...filterConvert({
          ...this.form,
          companyCode: {
            type: "filter",
            value: this.companyCode
          }
        })
      }
      this.tableLoading = true
      getEmployeeListPage(params)
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
          this.deleteUser(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    // 删除
    deleteUser(id, index) {
      let params = { id }
      deleteUser(params).then(res => {
        this.tableData.splice(index, 1)
        this.$notify.success({
          title: "成功",
          message: "删除成功！"
        })
      })
    },
    addItem() {
      this.$router.push("/daily/employee/add")
    },
    copyItem(id) {
      this.$router.push(`/daily/employee/add?copyFrom=${id}`)
    },
    jumpToDetail(row) {
      this.$router.push(`/daily/employee/detail/${row.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>