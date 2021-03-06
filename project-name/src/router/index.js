import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login"
import Appindex from "@/components/home/Appindex"
import Registe from "../components/Registe";
import FindPassword from "@/components/FindPassword";
import sceneIndex from "../components/scene/sceneIndex";
import orderIndex from "../components/order/orderIndex";
import myInfoIndex from "../components/myinfo/myInfoIndex"
import Home from "../components/menu/Home";
import MyInfoManage from "../components/myinfo/MyInfoManage";
import MyHeadManage from "../components/myinfo/MyHeadManage";
import SceneDetail from "../components/scene/SceneDetail";
import SceneIntroduce from "../components/scene/SceneIntroduce";
import MyBaiduMap from "../components/scene/MyBaiduMap";
import OrderForm from "../components/order/OrderForm";
import MyReserveManage from "../components/myinfo/MyReserveManage";
import UserManage from "../components/admin/UserManage";
import OrderManage from "../components/admin/OrderManage";

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/scene/login',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registe',
      name: 'Registe',
      component: Registe
    },
    {
      path: '/index',
      name: 'Index',
      component: Appindex
    },
    {
      path: '/findpass',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/scene',
          name: 'Scene',
          component: sceneIndex,
          children: [
            {
              path: 'sceneDetail',
              name:'/scene/sceneDetail',
              component: SceneDetail
            },
            {
              path: 'sceneIntroduce',
              name: '/scene/sceneIntroduce',
              component: SceneIntroduce
            },
            {
              path: 'sceneMap',
              name:'/scene/sceneMap',
              component: MyBaiduMap
            }
          ]
        },
        {
          path: '/order',
          name: 'Order',
          component: orderIndex,
          children: [
            {
              path: 'orderForm',
              name:'/order/orderForm',
              component: OrderForm
            }
          ]
        },
        {
          path: '/myInfo',
          name: 'MyInfo',
          component: myInfoIndex,
          children: [
            {
              path: 'myInfoManage',
              name: '/myInfo/myInfoManage',
              component: MyInfoManage
            },
            {
              path: 'myHeadManage',
              name: '/myInfo/myHeadManage',
              component: MyHeadManage
            },
            {
              path: 'myReserveManage',
              name: '/myInfo/myReserveManage',
              component: MyReserveManage
            }
          ]
        },
        {
          path: '/userManage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: '/orderManage',
          name: 'OrderManage',
          component: OrderManage
        }
      ]
    }
  ]
})
