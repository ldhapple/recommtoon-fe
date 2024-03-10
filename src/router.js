import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue'; // LoginPage 컴포넌트를 import
import Home from '@/pages/HomePage.vue';
import RegisterPage from "@/pages/RegisterPage.vue";
import EvaluatePage from "@/pages/EvaluatePage.vue"
import RecommendationPage from "@/pages/RecommendationPage.vue";
import useAuthStore from "@/stores/authStore";
import WebtoonBoardPage from "@/pages/WebtoonBoardPage.vue";

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
        {
            path: '/evaluate',
            name: 'EvaluatePage',
            component: EvaluatePage,
            meta: {requireAuth: true}
        },
        {
            path: '/recommendation',
            name: 'RecommendationPage',
            component: RecommendationPage,
            meta: {requireAuth: true}
        },
        {
            path: '/board/:titleId',
            name: 'WebtoonBoardPage',
            component: WebtoonBoardPage,
            props: true
        }
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.state.isAuthenticated;

    if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
        next({name: 'LoginPage'});
    } else {
        next();
    }
})

export default router;