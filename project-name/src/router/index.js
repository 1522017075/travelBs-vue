import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login"
import Appindex from "@/components/home/Appindex"
import Registe from "../components/Registe";
import FindPassword from "@/components/FindPassword";

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Appindex
    },
    {
      path: '/registe',
      name: 'Registe',
      component: Registe
    },
    {
      path: '/findpass',
      name: 'FindPassword',
      component: FindPassword
    }
  ]
})
