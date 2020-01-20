<template>
  <div class="page">
    <el-collapse class="collapse" v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="header-icon fa fa-list-alt fa-fw"></i>
          基本信息
        </template>
        <BasicForm></BasicForm>
      </el-collapse-item>

      <el-collapse-item name="2">
        <template slot="title">
          <i class="header-icon fa fa-credit-card fa-fw"></i>
          财务信息
        </template>
        <FinanceForm></FinanceForm>
      </el-collapse-item>

      <el-collapse-item name="3">
        <template slot="title">
          <i class="header-icon fa fa-address-book-o fa-fw"></i>
          联系人信息
        </template>
        <ContactsTable></ContactsTable>
      </el-collapse-item>

      <el-collapse-item name="4">
        <template slot="title">
          <i class="header-icon fa fa-comments-o fa-fw"></i>
          收发通
        </template>
        <AddressTable></AddressTable>
      </el-collapse-item>

      <!-- <el-collapse-item name="5">
        <template slot="title">
          <i class="header-icon fa fa-edit fa-fw"></i>
          收发通一体
        </template>
        <CustomInput></CustomInput>
      </el-collapse-item>-->
    </el-collapse>
  </div>
</template>

<script>
import BasicForm from "./components/BasicForm"
import FinanceForm from "./components/FinanceForm"
import ContactsTable from "./components/ContactsTable"
import AddressTable from "./components/AddressTable"
import CustomInput from "./components/CustomInput"
import { mapMutations, mapState } from "vuex"

export default {
  components: {
    BasicForm,
    FinanceForm,
    ContactsTable,
    AddressTable,
    CustomInput
  },
  computed: {
    ...mapState("customerDetail", ["mode"])
  },
  beforeDestroy() {
    this.RESET_STATE()
  },
  created() {
    this.setMode()
    if (this.mode == "detail") {
      this.SET_CUSTOMER_ID(this.$route.params.id)
    }
  },
  data() {
    return {
      activeName: "1"
    }
  },
  methods: {
    ...mapMutations("customerDetail", ["SET_CUSTOMER_ID", "SET_MODE", "RESET_STATE"]),
    setMode() {
      let path = this.$route.path
      let mode = ""
      if (path.includes("/add")) {
        mode = "add"
      } else if (path.includes("/detail")) {
        mode = "detail"
      }
      this.SET_MODE(mode)
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
      .header-icon {
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