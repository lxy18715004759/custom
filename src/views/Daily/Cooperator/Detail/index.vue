<template>
  <div class="page">
    <el-collapse class="collapse" v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="fa fa-file-text-o fa-fw"></i>
          单位基本信息
        </template>
        <BasicForm :id.sync="id" :companyName.sync="companyName" :mode="mode"></BasicForm>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <i class="fa fa-list fa-fw"></i>
          联系人信息
        </template>
        <ContactsTable :id="id" :companyName="companyName" :mode="mode"></ContactsTable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BasicForm from "./components/BasicForm"
import ContactsTable from "./components/ContactsTable"

export default {
  components: {
    BasicForm,
    ContactsTable
  },
  computed: {
    mode() {
      let path = this.$route.path
      if (path.includes("/add")) {
        return "add"
      } else if (path.includes("/detail")) {
        return "detail"
      }
    }
  },
  created() {
    if (this.mode == "detail") {
      this.id = this.$route.params.id
    }
  },
  data() {
    return {
      activeName: "1",
      id: "",
      companyName: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  border-bottom: none;
  /deep/.el-collapse-item {
    margin-bottom: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    &__wrap {
      padding: 0 16px;
    }
    &__header {
      font-size: 14px;
      font-weight: 500;
      background: #2e5684;
      color: #fff;
      padding: 0 10px;
      height: 36px;
      border-bottom: none;
      .fa {
        margin-right: 6px;
        font-size: 16px;
      }
    }
    &__content {
      padding: 20px 0;
    }
  }
}
</style>