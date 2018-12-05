import Vue from "vue";
import Vuex from "vuex";
import master from "./components/masterManage/store";
import users from "./components/userManage/store";
import stores from "./components/storesManage/store";
import order from "./components/orderManage/store";
import goods from "./components/goodsManage/store";
import service from "./components/serviceManage/store";
import Reg from "./components/store"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    master,users,stores,order,goods,service,Reg
  }
});
