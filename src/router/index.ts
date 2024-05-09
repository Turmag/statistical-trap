import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/statistical-trap/',
        name: 'Home',
        component: () => import('@/App.vue'),
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
