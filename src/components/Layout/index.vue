<template>
  <div class="layout">
    <AppMenu></AppMenu>
    <AppMain></AppMain>
  </div>
</template>

<script>
import AppMenu from "./components/AppMenu"
import AppMain from "./components/AppMain"
export default {
  components: {
    AppMenu,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>