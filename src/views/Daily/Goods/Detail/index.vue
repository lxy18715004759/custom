<template>
  <div class="page">
    <el-collapse class="collapse" v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="fa fa-file-text-o fa-fw"></i>
          货物基本信息
        </template>
        <BasicForm :productId.sync="productId" :mode="mode"></BasicForm>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <i class="fa fa-list fa-fw"></i>
          货物归类信息
        </template>
        <CatagoryForm :productId="productId" :mode="mode"></CatagoryForm>
      </el-collapse-item>

      <el-collapse-item name="3">
        <template slot="title">
          <i class="fa fa-file-photo-o fa-fw"></i>
          货物图片信息
        </template>
        <GoodsImg :productId="productId" :mode="mode"></GoodsImg>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BasicForm from "./components/BasicForm"
import CatagoryForm from "./components/CatagoryForm"
import GoodsImg from "./components/GoodsImg"

export default {
  components: {
    BasicForm,
    CatagoryForm,
    GoodsImg
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
      this.productId = this.$route.params.id
    }
  },
  data() {
    return {
      activeName: "1",
      productId: ""
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