import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

import routes from "./routes";

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()

});

router.afterEach((to, from) => {
  NProgress.done()
})


export default router;
