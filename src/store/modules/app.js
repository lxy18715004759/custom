const app = {
  namespaced: true,
  state: {
    hideMenu: false
  },

  getters: {

  },

  mutations: {
    TOGGLE_SIDE_MENU: (state, status) => {
      if (typeof status != "undefined") {
        state.hideMenu = status
      } else {
        state.hideMenu = !state.hideMenu
      }
    }
  },

  actions: {
    toggleSideMenu({ commit }, status) {
      commit('TOGGLE_SIDE_MENU', status)
    }
  }
}

export default app
