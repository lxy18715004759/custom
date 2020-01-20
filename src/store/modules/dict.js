import { getAllCountryCode, getMoneyCodeInCustomer, getCompanyOperatorUser, getCompanySalesperson, getSimpleCustomerRo, getAllUnitCode, getAllRole, getAllPortCode } from "@/api"
import { appId } from "@/utils/global"
import axios from "axios"
const dict = {
  namespaced: true,
  state: {
    allCountryCode: [],
    moneyCode: [],
    companyOperator: [],
    companySales: [],
    customerCode: [],
    allUnitCode: [],
    roles: [],
    allVessl: []
  },

  getters: {
    // 自定义 国家名字 国家代码筛选
    allCountryCode: state => keyword => {
      let list = state.allCountryCode
      let keywordUpperCase = keyword.toUpperCase()
      let keywordLowerCase = keyword.toLowerCase()

      // 国家code全匹配
      if (keyword.length == 3) {
        return list.filter(item => {
          return item.code == keywordUpperCase
        })
      }

      return list.filter(item => {
        return item.name.includes(keyword) || item.code.includes(keywordUpperCase) || item.pinyinName.includes(keywordLowerCase) || item.simplePinyinName.includes(keywordLowerCase)
      })
    },

    // 自定义 币种 筛选
    moneyCode: state => keyword => {
      let list = state.moneyCode
      let keywordUpperCase = keyword.toUpperCase()
      let keywordLowerCase = keyword.toLowerCase()

      return list.filter(item => {
        return item.name.includes(keyword) || item.code.includes(keywordUpperCase) || item.pinyinName.includes(keywordLowerCase) || item.simplePinyinName.includes(keywordLowerCase)
      })
    },

    // 自定义 操作员 筛选
    companyOperator: state => keyword => {
      let list = state.companyOperator
      let keywordLowerCase = keyword.toLowerCase()

      return list.filter(item => {
        return item.nickName.includes(keyword) || item.pinyinName.includes(keywordLowerCase) || item.username.includes(keywordLowerCase)
      })
    },

    // 自定义 销售 筛选
    companySales: state => keyword => {
      let list = state.companySales
      let keywordLowerCase = keyword.toLowerCase()

      return list.filter(item => {
        return item.nickName.includes(keyword) || item.pinyinName.includes(keywordLowerCase) || item.username.includes(keywordLowerCase)
      })
    },

    // 自定义 客户代码 筛选
    customerCode: state => keyword => {
      let list = state.customerCode
      let keywordUpperCase = keyword.toUpperCase()
      let keywordLowerCase = keyword.toLowerCase()

      return list.filter(item => {
        return item.customerCode.includes(keywordUpperCase) || item.pinyinName.includes(keywordLowerCase) || item.chineseName.includes(keyword)
      })
    },

    // 自定义 单位 筛选
    unitCode: state => keyword => {
      let list = state.allUnitCode
      let keywordLowerCase = keyword.toLowerCase()
      return list.filter(item => {
        return item.code.includes(keyword) || item.pinyinName.includes(keywordLowerCase) || item.name.includes(keyword)
      })
    },

    // 根据单位code 返回单位名称
    unitCodeMatchByCode: state => code => {
      let list = state.allUnitCode
      let res = list.find(item => {
        return item.code == code
      })
      return res ? res.name : ""
    },

  },

  mutations: {
    SET_ALL_COUNTRY_CODE: (state, params) => {
      state.allCountryCode = params
    },
    SET_MONEY_CODE: (state, params) => {
      state.moneyCode = params
    },
    SET_COMPANY_OPERATOR: (state, params) => {
      state.companyOperator = params
    },
    SET_COMPANY_SALES: (state, params) => {
      state.companySales = params
    },
    SET_CUSTOMER_CODE: (state, params) => {
      state.customerCode = params
    },
    SET_ALL_UNIT_CODE: (state, params) => {
      state.allUnitCode = params
    },
    SET_ALL_ROLES: (state, params) => {
      state.roles = params
    },
    SET_ALL_VESSL: (state, params) => {
      state.allVessl = params
    },
  },

  actions: {
    // 获取国家编码
    getAllCountryCode({ state, commit }) {
      if (state.allCountryCode && state.allCountryCode.length > 0) return
      return new Promise((resolve, reject) => {
        let params = { appId }
        getAllCountryCode(params).then(res => {
          commit("SET_ALL_COUNTRY_CODE", res)
          resolve()
        })
      })
    },

    // 获取币种编码
    getMoneyCodeInCustomer({ state, commit }) {
      if (state.moneyCode && state.moneyCode.length > 0) return
      return new Promise((resolve, reject) => {
        let params = { appId }
        getMoneyCodeInCustomer(params).then(res => {
          commit("SET_MONEY_CODE", res)
          resolve()
        })
      })
    },

    // 获取公司操作员
    async getCompanyOperatorUser({ state, dispatch, commit, rootState }) {
      await dispatch("user/getUserInfo", {}, { root: true })
      if (state.companyOperator && state.companyOperator.length > 0) return
      return new Promise((resolve, reject) => {
        let params = {
          appId,
          companyCode: rootState.user.companyCode
        }
        getCompanyOperatorUser(params).then(res => {
          commit("SET_COMPANY_OPERATOR", res)
          resolve()
        })
      })
    },

    // 获取公司销售
    async getCompanySalesperson({ state, dispatch, commit, rootState }) {
      await dispatch("user/getUserInfo", {}, { root: true })
      if (state.companySales && state.companySales.length > 0) return
      return new Promise((resolve, reject) => {
        let params = {
          appId,
          companyCode: rootState.user.companyCode
        }
        getCompanySalesperson(params).then(res => {
          commit("SET_COMPANY_SALES", res)
          resolve()
        })
      })
    },

    // 获取客户代码
    async getSimpleCustomerRo({ state, dispatch, commit, rootState }) {
      await dispatch("user/getUserInfo", {}, { root: true })
      if (state.customerCode && state.customerCode.length > 0) return
      return new Promise((resolve, reject) => {
        let params = {
          appId,
          companyCode: rootState.user.companyCode
        }
        getSimpleCustomerRo(params).then(res => {
          commit("SET_CUSTOMER_CODE", res)
          resolve()
        })
      })
    },

    // 获取单位编码
    getAllUnitCode({ state, commit }) {
      if (state.allUnitCode && state.allUnitCode.length > 0) return
      return new Promise((resolve, reject) => {
        let params = { appId }
        getAllUnitCode(params).then(res => {
          commit("SET_ALL_UNIT_CODE", res)
          resolve()
        })
      })
    },

    // 获取角色列表
    getAllRole({ state, commit }) {
      if (state.roles && state.roles.length > 0) return
      return new Promise((resolve, reject) => {
        let params = { appId }
        getAllRole(params).then(res => {
          commit("SET_ALL_ROLES", res)
          resolve()
        })
      })
    },

    // 获取船名列表
    getAllVessl({ state, commit }) {
      if (state.allVessl && state.allVessl.length > 0) return
      return new Promise((resolve, reject) => {
        axios.get(`/third`).then(res => {
          commit("SET_ALL_VESSL", res)
          resolve()
        })
      })
    },
  }
}

export default dict
