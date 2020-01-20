import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app'
import dict from './modules/dict'
import user from './modules/user'
import customerDetail from './modules/customerDetail'
import order from './modules/order'
import getters from './getters'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    app,
    dict,
    user,
    customerDetail,
    order
  },
  getters,
});
export default store
