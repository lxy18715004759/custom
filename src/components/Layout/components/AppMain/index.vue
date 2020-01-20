<template>
  <div class="main" :class="{'hide-menu': hideMenu}">
    <AppHeader></AppHeader>
    <div class="main-content">
      <transition name="fade-transverse" mode="out-in">
        <router-view />
      </transition>
      <footer>© 浙江仙林信息科技有限公司</footer>
    </div>
  </div>
</template>

<script>
import AppHeader from "../AppHeader"
import { mapGetters } from "vuex"
export default {
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters(["hideMenu"])
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100%;
  margin-left: $menu-width;
  transition: margin-left 0.5s;
  &.hide-menu {
    margin-left: 64px;
  }
  &-content {
    height: calc(100vh - 64px - 42px);
    overflow-y: auto;
    background: #f0f2f5;
    padding: 20px 20px 0;
    position: relative;

    footer {
      text-align: center;
      padding: 20px 0;
      color: #666;
    }
  }
}

// 过渡动画 横向渐变
.fade-transverse-leave-active,
.fade-transverse-enter-active {
  transition: all 0.5s;
}
.fade-transverse-enter,
.fade-transverse-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>