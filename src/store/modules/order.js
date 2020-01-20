// 订单页面公共数据
import { clone } from "@/utils"

const state = {
  orderNumber: "",
  mode: "",
  customerId: "",
  portStartTime: "",
  portEndTime: "",
  shipName: "",
  shipCode: "",
  acceptPeople: {
    id: "",
    name: "",
    phone: ""
  },
  noticePeople: {
    id: "",
    name: "",
    phone: ""
  },
  sendPeopleList: [],
  mainOrderNumber: "",
  otherOrderNumber: [],
  boxList: [],
  orderBoxList: []
}

const copyState = clone(state)

const getters = {
  orderNumberList: state => {
    if (state.otherOrderNumber && state.otherOrderNumber.length > 0) {

      return [state.mainOrderNumber, ...state.otherOrderNumber]
    }

    return [state.mainOrderNumber]
  }
}

const mutations = {
  SET_ORDER_NUMBER: (state, params) => {
    state.orderNumber = params
  },
  SET_MODE: (state, params) => {
    state.mode = params
  },
  SET_CUSTOMER_ID: (state, params) => {
    state.customerId = params
  },
  SET_PORT_START_TIME: (state, params) => {
    state.portStartTime = params
  },
  SET_PORT_END_TIME: (state, params) => {
    state.portEndTime = params
  },
  SET_SHIP_NAME: (state, params) => {
    state.shipName = params
  },
  SET_SHIP_CODE: (state, params) => {
    state.shipCode = params
  },
  SET_CONTACT_PEOPLE: (state, params) => {
    console.log("123", params);

    state.acceptPeople.id = params.acceptPeopleId
    state.acceptPeople.name = params.acceptPeopleName
    state.acceptPeople.phone = params.acceptPeoplePhone

    state.noticePeople.id = params.noticePeopleId
    state.noticePeople.name = params.noticePeopleName
    state.noticePeople.phone = params.noticePeoplePhone
    state.sendPeopleList = params.orderFifthTotalBillForms.map(item => {
      return {
        id: item.sendPeopleId,
        name: item.sendPeopleName,
        phone: item.sendPeoplePhone
      }
    })
  },

  SET_MAIN_ORDER_NUMBER: (state, params) => {
    state.mainOrderNumber = params
  },

  SET_OTHER_ORDER_NUMBER: (state, params) => {
    state.otherOrderNumber = params
  },

  SET_BOX_LIST: (state, params) => {
    state.boxList = params
  },
  SET_ORDER_BOX_LIST: (state, params) => {
    state.orderBoxList = params
  },
  RESET_ORDER_STATE: (state) => {
    for (const key in copyState) {
      if (copyState.hasOwnProperty(key)) {
        const element = copyState[key];
        state[key] = element
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
