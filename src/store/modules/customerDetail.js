// 客户详情页面 公用数据
const customerDetail = {
  namespaced: true,
  state: {
    customerId: "",
    mode: "",
    companyName: ""
  },

  getters: {

  },

  mutations: {
    SET_CUSTOMER_ID: (state, params) => {
      state.customerId = params
    },
    SET_MODE: (state, params) => {
      state.mode = params
    },
    SET_COMPANY_NAME: (state, params) => {
      state.companyName = `-${params}`
    },
    RESET_STATE: state => {
      state.customerId = ""
      state.mode = ""
      state.companyName = ""
    }

  }
}

export default customerDetail
