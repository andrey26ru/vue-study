import Vue from "vue";
import Router from "vue-router";
import AuthGuard from "./auth-guard";
import Home from "@/components/Home"; // @ задаёт путь из корневой папки приложения
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";
import Orders from "@/components/User/Orders";
import NewProduct from "@/components/Products/NewProduct";
import AboutUs from "@/components/Products/AboutUs";
import Product from "@/components/Products/Product";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/new",
      name: "new",
      component: NewProduct,
      beforeEnter: AuthGuard
    },
    {
      path: "/about",
      name: "about",
      component: AboutUs,
      beforeEnter: AuthGuard
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: "/product/:id",
      props: true,
      name: "product",
      component: Product
    } //  props передаст id в компонент как параметр
  ],
  mode: "history"
});
