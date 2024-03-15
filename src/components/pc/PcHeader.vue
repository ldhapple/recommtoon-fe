<script>
import {computed} from "vue";
import useAuthStore from "@/stores/authStore";
import axios from "@/axios";
import router from "@/router";

export default {
  name: 'PcHeader',
  data() {
    return {
      isMenuVisible: false,
      activeMenu: '',
      menus: [
        {name: '전체 웹툰', path: '/allWebtoons'},
        {name: '평가하기', path: '/evaluate'},
        {name: 'AI 추천 웹툰', path: '/recommendation'},
        {name: '친구의 웹툰', path: '/friendWebtoon'},
      ],
    };
  },
  methods: {
    setActiveMenu(menuName) {
      this.activeMenu = menuName;
      this.isMenuVisible = false;
    },
    goHome() {
      this.activeMenu = '';
      this.$router.push('/');
    }
  },
  setup() {
    const {state, clearAuth} = useAuthStore();
    const logout = async () => {
      try {
        await axios.post('/api/auth/logout');
        clearAuth();
        router.push('/');
        window.alert("로그아웃 되었습니다.");
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    };

    return {
      isAuthenticated: computed(() => state.isAuthenticated),
      username: computed(() => state.username),
      logout,
    };
  },
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#!" @click="goHome">Recommtoon</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                @click="isMenuVisible = !isMenuVisible">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ 'show': isMenuVisible }" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-for="menu in menus" :key="menu.name" class="nav-item">
              <router-link :to="menu.path" class="nav-link" :class="{ 'active': activeMenu === menu.name }"
                           @click="setActiveMenu(menu.name)">
                {{ menu.name }}
              </router-link>
            </li>
          </ul>
          <div class="text-end">
            <template v-if="!isAuthenticated">
              <button type="button" class="btn btn-outline-light me-2" @click="$router.push('/login')">Login</button>
              <button type="button" class="btn btn-warning" @click="$router.push('/register')">회원 가입</button>
            </template>
            <template v-if="isAuthenticated">
              <span>{{ username }}</span>
              <button type="button" class="btn btn-warning" @click="logout">로그아웃</button>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>


<style scoped>
.span {
  color: white;
}
</style>