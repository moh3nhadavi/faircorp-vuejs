import { createRouter, createWebHistory } from 'vue-router'
// import HomeSection from '../views/Home.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/rooms/:id',
        name: 'Room',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

        component: () => import(/* webpackChunkName: "about" */ '../views/Room.vue')
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router