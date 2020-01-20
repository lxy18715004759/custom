<template>
  <div class="menu" :class="{'hide-menu': hideMenu}" @mouseenter="toggleSideMenu(false)" @mouseleave="toggleSideMenu(true)">
    <div class="logo">
      <img src="@/assets/image/logo.png" alt />
    </div>
    <div class="menu-nav">
      <el-scrollbar>
        <el-menu :default-active="$route.path" router :collapse="hideMenu" background-color="#00152a" text-color="#ccc" active-text-color="#fff">
          <el-submenu index="/daily">
            <template slot="title">
              <i class="fa fa-tasks fa-fw"></i>
              <span>日常任务</span>
            </template>
            <el-menu-item index="/daily/order/list">
              <i class="fa fa-tags fa-fw"></i>订单管理
            </el-menu-item>
            <el-menu-item index="/daily/goods/list">
              <i class="fa fa-cubes fa-fw"></i>货物库
            </el-menu-item>
            <el-menu-item index="/daily/customer/list">
              <i class="fa fa-user-secret fa-fw"></i>客户管理
            </el-menu-item>
            <el-menu-item index="/daily/employee/list">
              <i class="fa fa-users fa-fw"></i>员工管理
            </el-menu-item>
            <el-menu-item index="/daily/cooperator/list">
              <i class="fa fa-handshake-o fa-fw"></i>往来单位
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  computed: {
    ...mapGetters(["hideMenu"])
  },
  mounted() {},
  methods: {
    ...mapActions("app", ["toggleSideMenu"])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 0;
  top: 0;
  width: $menu-width;
  height: 100%;
  z-index: 2001;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #00152a;
  transition: width 0.5s;

  &.hide-menu {
    width: 64px;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: $menu-width;
  }

  .logo {
    height: 64px;
    background: #002140;
    flex-shrink: 0;
    padding: 12px;
    text-align: center;
    img {
      height: 100%;
      object-fit: contain;
    }
  }

  &-nav {
    height: 0;
    flex: 1;
    overflow: hidden;
    /deep/ .el-scrollbar {
      height: 100%;
      &__wrap {
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    /deep/ .el-menu {
      border-right: none;
      &-item {
        transition: all 0.3s;
        i {
          margin-right: 6px;
        }
      }
      .is-active {
        background-color: #1990ff !important;
      }
    }
  }
}
</style>