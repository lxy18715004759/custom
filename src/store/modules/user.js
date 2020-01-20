import { getUserInfo } from "@/api"
const user = {
  namespaced: true,
  state: {
    changePassword: 0,
    companyCode: "",
    description: "",
    email: "",
    expireTime: -1,
    headUrl: "",
    id: "",
    locked: 0,
    nickName: "",
    passwordExpireTime: -1,
    phoneNumber: "",
    pinyinName: "",
    roles: null,
    username: ""
  },

  mutations: {
    SET_USER_INFO: (state, params) => {
      state.changePassword = params.changePassword
      state.companyCode = params.companyCode
      state.description = params.description
      state.email = params.email
      state.expireTime = params.expireTime
      state.headUrl = params.headUrl
      state.id = params.id
      state.locked = params.locked
      state.nickName = params.nickName
      state.passwordExpireTime = params.passwordExpireTime
      state.phoneNumber = params.phoneNumber
      state.pinyinName = params.pinyinName
      state.roles = params.roles
      state.username = params.username
    }
  },

  actions: {
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        let params = { id: localStorage.getItem("userId") }
        getUserInfo(params).then(res => {
          commit("SET_USER_INFO", res || {})
          resolve(res)
        })
      })
    }
  }
}

export default user
