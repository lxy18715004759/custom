<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="pager.pageNumber"
      :page-size="pager.pageSize"
      :total="pager.total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
    />
  </div>
</template>

<script>
export default {
  props: {
    pager: {
      type: Object,
      default: () => {
        return {
          pageNumber: 1,
          pageSize: 20,
          total: 0
        }
      }
    }
  },
  methods: {
    // 修改每页条数
    handleSizeChange(pageSize) {
      this.$emit("update:pager", {
        pageNumber: 1,
        pageSize,
        total: this.pager.total
      })
      this.$emit("change")
    },

    // 修改页码
    handlePageChange(pageNumber) {
      this.$emit("update:pager", {
        pageNumber,
        pageSize: this.pager.pageSize,
        total: this.pager.total
      })
      this.$emit("change")
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
  padding-top: 15px;
}
</style>