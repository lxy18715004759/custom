<template>
  <div class="page">home</div>
</template>

<script>
export default {
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss" scoped>
.page {
  /deep/ .hello {
    color: red;
  }
}
</style>
