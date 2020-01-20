<template>
  <div class="header">
    <div class="nav">
      <div class="left">
        <!-- <i v-if="hideMenu" @click="toggleSideMenu()" class="el-icon-s-unfold"></i>
        <i v-else @click="toggleSideMenu()" class="el-icon-s-fold"></i>-->
        <h1>进出口贸易协同系统 V1.0</h1>
      </div>
      <div class="right">
        <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
          <div class="fullscreen" @click="toggle" v-if="showFullscreen">
            <i class="el-icon-full-screen" :class="{'normal': isFullscreen}"></i>
          </div>
        </el-tooltip>

        <div class="user">
          <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div>用户名</div>
        </div>
      </div>
    </div>
    <div class="breadcrumb">
      <el-page-header @back="goBack()"></el-page-header>
      <el-breadcrumb separator="/" slot="content">
        <el-breadcrumb-item :to="{ path: '/daily/order/list' }">首页</el-breadcrumb-item>
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
            <span v-if="item.redirect==='noRedirect'||index==breadList.length-1">{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull"
import hotkeys from "hotkeys-js"
import { mapActions } from "vuex"
export default {
  data() {
    return {
      breadList: null,
      showFullscreen: true,
      isFullscreen: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(routes) {
        let { matched } = routes
        this.breadList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      }
    }
  },
  mounted() {
    this.getUserInfo()
    this.screenfullListener()
    hotkeys("esc", (event, handler) => {
      this.$router.go(-1)
    })
  },
  methods: {
    ...mapActions("user", ["getUserInfo"]),
    handleLink(item) {
      this.$router.push(item.path)
    },

    screenfullListener() {
      if (screenfull.isEnabled) {
        screenfull.on("change", () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      } else {
        this.showFullscreen = false
      }
    },

    toggle() {
      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else {
        screenfull.request()
      }
    },

    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.nav {
  height: 64px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      color: #666;
      cursor: pointer;
      padding-top: 3px;
    }
    h1 {
      font-size: 16px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .fullscreen {
      padding: 4px;
      font-size: 16px;
      margin-right: 20px;
      i {
        transition: all 0.3s ease;
        &.normal {
          transform: rotate(45deg);
        }
      }
    }
    .user {
      display: flex;
      align-items: center;
      .el-avatar {
        border: 1px solid #eee;
        margin-right: 6px;
      }
    }
  }
}
.breadcrumb {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>