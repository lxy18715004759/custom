import Layout from '@/components/Layout'
const DailyOrderList = () => import(/* webpackChunkName: "DailyOrder" */ "@/views/Daily/Order/List")
const DailyOrderDetail = () => import(/* webpackChunkName: "DailyOrderDetail" */ "@/views/Daily/Order/Detail")
const DailyCustomerList = () => import(/* webpackChunkName: "DailyCustomerList" */ "@/views/Daily/Customer/List")
const DailyCustomerDetail = () => import(/* webpackChunkName: "DailyCustomerDetail" */ "@/views/Daily/Customer/Detail")
const DailyGoodsList = () => import(/* webpackChunkName: "DailyGoodsList" */ "@/views/Daily/Goods/List")
const DailyGoodsDetail = () => import(/* webpackChunkName: "DailyGoodsDetail" */ "@/views/Daily/Goods/Detail")

const DailyCooperatorList = () => import(/* webpackChunkName: "DailyCooperatorList" */ "@/views/Daily/Cooperator/List")
const DailyCooperatorDetail = () => import(/* webpackChunkName: "DailyCooperatorDetail" */ "@/views/Daily/Cooperator/Detail")

const DailyEmployeeList = () => import(/* webpackChunkName: "DailyEmployeeList" */ "@/views/Daily/Employee/List")
const DailyEmployeeDetail = () => import(/* webpackChunkName: "DailyEmployeeDetail" */ "@/views/Daily/Employee/Detail")
export default {
  path: '/daily',
  component: Layout,
  redirect: "noRedirect",
  meta: {
    title: "日常任务"
  },
  children: [
    {
      path: 'order/list',
      component: DailyOrderList,
      meta: {
        title: "订单管理"
      }
    },
    {
      path: 'order/detail/:id',
      component: DailyOrderDetail,
      meta: {
        title: "订单详情"
      }
    },
    {
      path: 'order/add',
      component: DailyOrderDetail,
      meta: {
        title: "新增订单"
      }
    },
    {
      path: 'customer/list',
      component: DailyCustomerList,
      meta: {
        title: "客户档案"
      }
    },
    {
      path: 'customer/detail/:id',
      component: DailyCustomerDetail,
      meta: {
        title: "客户详情"
      }
    },
    {
      path: 'customer/add',
      component: DailyCustomerDetail,
      meta: {
        title: "新增客户"
      }
    },
    {
      path: 'goods/list',
      component: DailyGoodsList,
      meta: {
        title: "货物库"
      }
    },
    {
      path: 'goods/detail/:id',
      component: DailyGoodsDetail,
      meta: {
        title: "货物详情"
      }
    },
    {
      path: 'goods/add',
      component: DailyGoodsDetail,
      meta: {
        title: "新增货物"
      }
    },

    {
      path: 'cooperator/list',
      component: DailyCooperatorList,
      meta: {
        title: "往来单位"
      }
    },
    {
      path: 'cooperator/detail/:id',
      component: DailyCooperatorDetail,
      meta: {
        title: "单位详情"
      }
    },
    {
      path: 'cooperator/add',
      component: DailyCooperatorDetail,
      meta: {
        title: "新增单位"
      }
    },

    {
      path: 'employee/list',
      component: DailyEmployeeList,
      meta: {
        title: "员工管理"
      }
    },
    {
      path: 'employee/detail/:id',
      component: DailyEmployeeDetail,
      meta: {
        title: "员工详情"
      }
    },
    {
      path: 'employee/add',
      component: DailyEmployeeDetail,
      meta: {
        title: "新增员工"
      }
    },


  ]
}
