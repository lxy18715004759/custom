<template>
  <div class="panel">
    <el-form :model="form" label-width="120px" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品编号">
            <el-input v-model="form.productCode" placeholder="产品编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-select disabled v-model="form.b" placeholder="客户名称">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="中文品名">
            <el-input v-model="form.chineseName" placeholder="中文品名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="英文品名">
            <el-input v-model="form.englishName" placeholder="英文品名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="包装单位">
            <el-input v-model="form.minBoxUnit" placeholder="包装单位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毛重（KG）">
            <el-input v-model="form.grossValue" placeholder="毛重"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="净重（KG）">
            <el-input v-model="form.netValue" placeholder="净重（KG）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="长（mm）">
            <el-input v-model="form.lengthValue" placeholder="长（mm）"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="宽（mm）">
            <el-input v-model="form.widthValue" placeholder="宽（mm）"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="高（mm）">
            <el-input v-model="form.heightValue" placeholder="高（mm）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="体积">
            <el-input v-model="form.volumeValue" placeholder="体积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格">
            <el-input v-model="form.format" placeholder="规格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="重/泡货">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="重货" value="重货"></el-option>
              <el-option label="泡货" value="泡货"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="唛头">
            <el-input v-model="form.mark" placeholder="唛头"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="海关 HS 代码">
            <el-select
              v-model="form.customsCode"
              value-key="goodCode"
              @change="codeChange"
              filterable
              remote
              reserve-keyword
              placeholder="请输入代码"
              :remote-method="searchGoodByCode"
              :loading="searchLoading"
            >
              <el-option class="custom-select-select" :label="item.goodCode" :value="item" v-for="(item, index) in codeList" :key="item.goodCode">
                <span class="custom-select-name">{{item.goodName}}</span>
                <span class="custom-select-code">{{item.goodCode}}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="商品名称">
            <el-input v-model="form.goodName" placeholder="商品名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="申报计量单位">
            <el-input placeholder="请输入内容" v-model="form.declareValue">
              <el-select filterable clearable default-first-option :filter-method="unitCodeFilter" v-model="form.declareUnit" slot="append" placeholder="输入单位">
                <el-option class="custom-select-select" :label="item.name" :value="item.code" v-for="(item, index) in unitCode(unitCodeKeyword)" :key="item.code">
                  <span class="custom-select-name">{{item.name}}</span>
                  <span class="custom-select-code">{{item.code}}</span>
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法定单位">
            <el-input placeholder="请输入内容" v-model="form.legalValue">
              <template slot="append">{{unitCodeMatchByCode(form.legalUnit)}}</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="第二单位">
            <el-input placeholder="请输入数量" v-model="form.secondValue" :disabled="!unitCodeMatchByCode(form.secondUnit)">
              <template slot="append">{{unitCodeMatchByCode(form.secondUnit)}}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tac">
      <el-button type="primary" icon="fa fa-save" @click="saveOrUpdateOrderSecond()">保存</el-button>
      <el-button type="success" icon="fa fa-download">导出货物清单</el-button>
    </div>

    <el-divider>货物信息</el-divider>

    <div class="cargo-table">
      <el-table :data="tableData" border stripe>
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
        <el-table-column prop="chineseName" label="中文品名"></el-table-column>
        <el-table-column prop="minBoxUnit" label="包装单位"></el-table-column>
        <el-table-column prop="lengthValue" label="长"></el-table-column>
        <el-table-column prop="widthValue" label="宽"></el-table-column>
        <el-table-column prop="heightValue" label="高"></el-table-column>
        <el-table-column prop="grossValue" label="毛重"></el-table-column>
        <el-table-column prop="netValue" label="净重"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { saveOrUpdateOrderSecond, searchGoodByCode, getOrderSecondDetail, addOrderSecond, updateOrderSecond } from "@/api"
import { mapGetters, mapActions, mapState } from "vuex"
export default {
  data() {
    return {
      form: {
        chineseName: "",
        customsCode: "",
        declareUnit: "",
        declareValue: null,
        englishName: "",
        format: "",
        goodName: "",
        grossUnit: "KG",
        grossValue: null,
        heightUnit: "",
        heightValue: null,
        legalUnit: "",
        legalValue: null,
        lengthUnit: "",
        lengthValue: null,
        minBoxUnit: "",
        netUnit: "",
        netValue: null,
        productCode: "",
        remark: "",
        secondUnit: "",
        secondValue: null,
        type: "",
        volumeUnit: "",
        volumeValue: null,
        widthUnit: "",
        widthValue: null
      },
      unitCodeKeyword: "",
      codeList: [],
      searchLoading: false,
      radio: 3,
      date: "",
      tableData: []
    }
  },
  computed: {
    ...mapGetters("dict", ["unitCode", "unitCodeMatchByCode"]),
    ...mapState("order", ["orderNumber", "mode"])
  },
  created() {
    this.getAllUnitCode()
    if (this.mode == "detail") {
      this.getOrderSecondDetail()
    }
  },
  methods: {
    ...mapActions("dict", ["getAllUnitCode"]),

    getOrderSecondDetail() {
      let params = {
        number: this.orderNumber
      }
      getOrderSecondDetail(params).then(res => {
        this.tableData = res
      })
    },

    saveOrUpdateOrderSecond() {
      if (this.form.id) {
        this.updateOrderSecond()
      } else {
        this.addOrderSecond()
      }
    },

    addOrderSecond() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId,
        orderNumber: this.orderNumber
      }
      addOrderSecond(params).then(res => {
        this.tableData.push(res)
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        })
      })
    },

    updateOrderSecond() {
      let params = {
        ...this.form,
        appId: this.GLOBAL.appId
      }
      updateOrderSecond(params).then(res => {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success"
        })
      })
    },

    searchGoodByCode(keywords) {
      let params = {
        appId: this.GLOBAL.appId,
        keywords
      }
      searchGoodByCode(params).then(res => {
        this.codeList = res
      })
    },

    codeChange(item) {
      console.log(item)
      this.form.customsCode = item.goodCode
      this.form.goodName = item.goodName
      this.form.legalUnit = item.legalUnitCode
      this.form.secondUnit = item.secondUnitCode
    },

    unitCodeFilter(e) {
      this.unitCodeKeyword = e
    }
  }
}
</script>

<style lang="scss" scoped>
</style>