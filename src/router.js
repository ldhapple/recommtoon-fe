import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue'; // LoginPage 컴포넌트를 import
import Home from '@/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
        }
        // 다른 라우트 설정
    ],
});

export default router;