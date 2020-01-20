import Vue from "vue"

const DICT = {
  blackList: {
    "0": "否",
    "1": "是"
  },

  // 往来单位类型
  cooperatorType: {
    1: "船代",
    2: "车队",
    3: "报关行",
    4: "仓库"
  },
  gender: {
    1: "男",
    0: "女"
  },

  // 箱型
  boxType: [
    "12R1", "10RF",
    "20T9", "20TG",
    "22G1", "20GP",
    "22P0", "22P0",
    "22P1", "20FR",
    "22R1", "20RF",
    "22T1", "20TK",
    "22U1", "20OT",
    "22V1", "20HT",
    "25G1", "20HQ",
    "25K1", "20HT(CMA)",
    "25R1", "20RH",
    "25U1", "25U1",
    "42G1", "40GP",
    "42G1", "40GP(CMA)",
    "42P0", "42P0",
    "42P1", "40FR",
    "42R1", "40RF",
    "42T1", "40TK",
    "42U1", "40OT",
    "42V1", "40HT",
    "45G1", "40HQ",
    "45G4", "40HH(CMA)",
    "45P1", "40FH",
    "45R1", "40RH",
    "45R9", "40RD",
    "45R9", "45R9",
    "45T1", "40HT(CMA)",
    "45V1", "45V1",
    "48T9", "40TG",
    "L2G1", "45GP",
    "L2P1", "45FR",
    "L2R1", "45RF",
    "L2T1", "45TK",
    "L2U1", "45OT",
    "L2V1", "45HT",
    "L5G1", "45GH",
    "L5R1", "45RH",
    "P5G1", "P5G1",
    "20GP",
    "20OT(开顶箱)",
    "20HC",
    "40GP",
    "40HQ",
    "45HQ",
    "40RH(冷代高)",
    "40RF(冷代平)",
    "40OT(开顶箱)",
    "40FR(框架箱)"
  ],

  // 成交方式
  dealMethod: [
    "CIF",
    "C&F",
    "FOB",
    "C&I",
    "市场价",
    "垫仓",
    "EXW"
  ],

  // 订单类型
  orderType: [
    "海运出口整箱",
    "海运出口拼箱",
    "海运进口整箱",
    "海运进口拼箱",
    "空运出口",
    "快递",
    "内贸",
    "空运进口",
  ],

  // 运输条款
  transportTerm: [
    "CY-FO",
    "CY-CY",
    "CY-CFS",
    "CFS-CY",
    "CFS-CFS",
    "CY-DOOR",
    "CFS-DOOR",
    "DOOR-CY",
    "DOOR-CFS",
    "DOOR-DOOR",
    "CY-RAMP",
    "CY-FREE OUT",
    "CY-LINER OUT",
    "DR-FREE OUT",
    "DR-LINER OUT",
    "TACKLE-CY",
    "CY-TACKLE",
    "TACKLE-CFS",
    "RAMP-CY",
    "FEE IN-CY",
    "FREE IN-D",
    "LINER IN-CY",
    "LINER IN-DR",
    "CY-SHIPS HOOK",
    "DOOR-RAMP",
    "RAMP-RAMP",
    "RAMP-CFS"
  ]

}

Vue.prototype.DICT = DICT