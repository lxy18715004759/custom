<template>
  <div class="panel">
    <ul class="imgs">
      <li v-for="(item, index) in imgList" :key="index">
        <img :src="item.imageUrl" />
        <div class="tools">
          <span @click="imgPreview(item)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span @click="deleteConfirm(item.id, index)">
            <i class="el-icon-delete"></i>
          </span>
        </div>
      </li>
    </ul>

    <Upload :options="options" @done="uploaded"></Upload>
    <el-dialog title="查看图片" :visible.sync="showImgViewer" width="600px">
      <img width="100%" :src="currentImgItem.imageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload"
import { getProductImage, deleteProductImage } from "@/api"
export default {
  components: {
    Upload
  },
  props: {
    productId: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgList: [],
      options: {
        callbackUrl: "/api/productImage/addProductImage/callback",
        params: {
          id: this.productId
        }
      },
      showImgViewer: false,
      currentImgItem: {}
    }
  },
  computed: {
    list() {
      return this.imgList.map(item => {
        return item.imageUrl
      })
    }
  },
  created() {
    this.getProductImage()
  },
  methods: {
    getProductImage() {
      let params = {
        productId: this.productId
      }
      getProductImage(params).then(res => {
        this.imgList = res
      })
    },
    uploaded(item) {
      this.imgList.push(item)
    },
    // 删除二次确认
    deleteConfirm(id, index) {
      this.$confirm("确认删除此图片吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteProductImage(id, index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    // 删除
    deleteProductImage(id, index) {
      let params = { id }
      deleteProductImage(params).then(res => {
        this.imgList.splice(index, 1)
        this.$notify.success({
          title: "成功",
          message: "删除成功！"
        })
      })
    },

    imgPreview(item) {
      this.currentImgItem = item
      this.showImgViewer = true
    }
  }
}
</script>

<style lang="scss" scoped>
.imgs {
  li {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: 0 10px 10px 0;
    border: 1px solid #eee;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:hover {
      .tools {
        top: 0;
      }
    }

    .tools {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 100%;
      transition: all 0.2s;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      span {
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>