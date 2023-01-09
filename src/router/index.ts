import { createRouter,createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        // name: 'Home',
        component: () => import('@/layout/Layout.vue'),
        // children: [
        //     {
        //         path: '/FlashView',
        //         name: 'FlashView',
        //         component: () => import('../views/LayerView/FlashView.vue'),
        //     },
        //     {
        //         path: '/WindView',
        //         name: 'WindView',
        //         component: () => import('../views/LayerView/WindView.vue'),
        //     },
        //     {
        //         path: '/C013View',
        //         name: 'C013View',
        //         component: () => import('../views/LayerView/C013View.vue'),
        //     },
        //     {
        //         path: '/C003View',
        //         name: 'C003View',
        //         component: () => import('../views/LayerView/C003View.vue'),
        //     },
        //     {
        //         path: '/SwanView',
        //         name: 'SwanView',
        //         component: () => import('../views/LayerView/SwanView.vue'),
        //     },
        // ]
    },
]

// const routes = [
//     { path: "/", redirect: "/home" },
//     {
//         path: "/home",
//         name: "home",
//         component: () => import("../home")
//     },
//     {
//         path: "/login",
//         name: "login",
//         component: () => import("../login")
//     }
// ]

 const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router

