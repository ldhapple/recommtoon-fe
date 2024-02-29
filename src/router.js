import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue'; // LoginPage 컴포넌트를 import
import Home from '@/pages/HomePage.vue';
import RegisterPage from "@/pages/RegisterPage.vue";

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
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: RegisterPage,
        },
        // 다른 라우트 설정
    ],
});

export default router;