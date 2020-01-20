<template>
  <el-date-picker v-model="date" @change="update" @keyup.enter.native="enter" value-format="yyyy-MM-dd" :ref="ref" type="date" placeholder="选择时间"></el-date-picker>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.date = newValue
    }
  },
  data() {
    return {
      date: this.value
    }
  },
  computed: {
    ref() {
      return Math.random()
        .toString(36)
        .substr(6)
    }
  },
  methods: {
    enter(e) {
      let val = e.target.value
      let arr = val.split("/")
      // 输入 月/日
      if (arr.length == 2) {
        let year = new Date().getFullYear()
        let res = [year, ...arr]
        this.date = res.join("-")
      }

      // 输入 年/月/日
      if (arr.length == 3) {
        // 输入 年后两位
        if (arr[0].length == 2) {
          arr[0] = "20" + arr[0]
        }
        this.date = arr.join("-")
      }
      this.update()
      let ref = this.$refs[this.ref]
      ref.handleChange()
      ref.pickerVisible = ref.picker.visible = false
      ref.blur()
    },

    update() {
      this.$emit("input", this.date)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>