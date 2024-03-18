import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue'; // LoginPage 컴포넌트를 import
import Home from '@/pages/HomePage.vue';
import RegisterPage from "@/pages/RegisterPage.vue";
import EvaluatePage from "@/pages/EvaluatePage.vue"
import RecommendationPage from "@/pages/RecommendationPage.vue";
import useAuthStore from "@/stores/authStore";
import WebtoonBoardPage from "@/pages/WebtoonBoardPage.vue";
import AllWebtoonPage from "@/pages/AllWebtoonPage.vue";
import FriendsWebtoonPage from "@/pages/FriendsWebtoonPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { title: 'Recommtoon' }
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: { title: 'Recommtoon - 로그인' }
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: RegisterPage,
            meta: { title: 'Recommtoon - 회원가입' }
        },
        {
            path: '/evaluate',
            name: 'EvaluatePage',
            component: EvaluatePage,
            meta: {requireAuth: true, title: 'Recommtoon - 평가하기'}
        },
        {
            path: '/recommendation',
            name: 'RecommendationPage',
            component: RecommendationPage,
            meta: {requireAuth: true, title: 'Recommtoon - 추천웹툰'}
        },
        {
            path: '/board/:titleId',
            name: 'WebtoonBoardPage',
            component: WebtoonBoardPage,
            props: true,
            meta: {title: 'Recommtoon - 게시판'}
        },
        {
            path: '/allWebtoons',
            name: 'AllWebtoonPage',
            component: AllWebtoonPage,
            props: true,
            meta: {title: 'Recommtoon - 전체웹툰'}
        },
        {
            path: '/friendWebtoon',
            name: 'FritendsWebtoonPage',
            component: FriendsWebtoonPage,
            props: true,
            meta: { title: 'Recommtoon - 친구의웹툰'}
        }
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.state.isAuthenticated;

    document.title = to.meta.title || 'Recommtoon';

    if (from.path === '/register' && to.name === 'LoginPage') {
        sessionStorage.setItem('fromRegisterToLogin', 'true');
    }

    if (to.matched.some(record => record.meta.requireAuth) && !isAuthenticated) {
        next({name: 'LoginPage'});
    } else {
        next();
    }
})

export default router;