import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 公用路由
export let constantRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/modules',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/modules',
        name: 'modules',
        component: () => import('@/views/modules/index'),
        hidden: true
      },
      {
        path: '/bulletin',
        name: 'bulletin',
        component: () => import('@/views/bulletin/index'),
        meta: {
          title: '灾情快报',
          icon: 'fa fa-file-text'
        },
        hidden: false
      },
      {
        path: '/check',
        name: 'check',
        component: () => import('@/views/check/index'),
        meta: {
          title: '灾情审核',
          icon: 'fa fa-calendar-check-o'
        },
        hidden: false
      },
      {
        path: '/map',
        name: 'MAP',
        component: () => import('@/views/map/index'),
        meta: {
          title: '灾情地图',
          icon: 'fa fa-map-marker'
        },
        hidden: false
      },
      {
        path: '/verification',
        name: 'verification',
        component: () => import('@/views/verification/index'),
        meta: {
          title: '灾情核查',
          icon: 'fa fa-search'
        },
        hidden: false
      },
      {
        path: '/retrieval',
        name: 'retrieval',
        component: () => import('@/views/retrieval/index'),
        meta: {
          title: '灾情检索',
          icon: 'fa fa-paste'
        },
        hidden: false
      },
      {
        path: '/warning',
        name: 'warning',
        component: () => import('@/views/warning/index'),
        meta: {
          title: '灾情预警',
          icon: 'fa fa-volume-up'
        },
        hidden: false
      }, {
        path: '/warning/examine',
        name: 'examine',
        component: () => import('@/views/warning/examine'),
        mete: {
          title: '灾情预警'
        },
        hidden: true
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  routes: constantRouterMap
})
