import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login";
import Reg from "./components/Reg";
import Info from "./components/Info";

import User from "./components/userManage/user";
import Goods from "./components/goodsManage/goods";
import Master from "./components/masterManage/master";
import Order from "./components/orderManage/order";
import Service from "./components/serviceManage/service";
import Stores from "./components/storesManage/stores";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/reg",
      name: "reg",
      component: Reg
    },
    {
      path: "/info",
      name: "info",
      component: Info,
      children: [
        {
          path: "/user",
          name: "user",
          component: User
        },
        {
          path: "/goods",
          name: "goods",
          component: Goods
        },
        {
          path: "/master",
          name: "master",
          component: Master
        },
        {
          path: "/order",
          name: "order",
          component: Order
        },
        {
          path: "/service",
          name: "service",
          component: Service
        },
        {
          path: "/stores",
          name: "stores",
          component: Stores
        }
      ]
    }
  ]
});
