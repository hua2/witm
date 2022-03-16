import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        name: "index",
        path: "/",
        component: () => import("../views/login/index.vue"),
      },
    {
        path: '/total',
        name: 'total',
        component: () => import(/* webpackChunkName: "total" */ '../views/total/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
    },
    {
        path: '/books',
        name: 'books',
        component: () => import(/* webpackChunkName: "books" */ '../views/books/index.vue')
    },
    {
        path: '/books/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '../views/books/setting.vue'),
    },
    {
        path: '/books/update',
        name: 'update',
        component: () => import(/* webpackChunkName: "update" */ '../views/books/update.vue'),
    },
    {
        path: '/books/join',
        name: 'join',
        component: () => import(/* webpackChunkName: "join" */ '../views/books/join.vue'),
    },
    {
        path: '/operation',
        name: 'operation',
        component: () => import(/* webpackChunkName: "operation" */ '../views/operation/index.vue'),
    },
    {
        path: '/operation/add',
        name: 'add',
        component: () => import(/* webpackChunkName: "add" */ '../views/operation/add.vue'),
    },
    {
        path: '/operation/classify',
        name: 'classify',
        component: () => import(/* webpackChunkName: "classify" */ '../views/operation/classify.vue'),
    }
]

// router.beforeEach( (to, from) => {
//   const TITLE: string = to.meta.title;
//   document.title = TITLE || '钱呢';
// })

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
