const Login = () => import(/* webpackChunkName: "login" */ "@/views/Login");

export default [
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {}
  },
  {
    path: "/",
    redirect: "/login"
  }
];
