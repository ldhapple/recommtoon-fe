<script>
import useAuthStore from "@/stores/authStore";
import axios from "@/axios";
import router from "@/router";
import {computed} from "vue";

export default {
  name: 'MobileHeader',
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
}
</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/#!" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <span>Recommtoon</span>
        </a>
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
  </header>
</template>

<style scoped>
.btn-mobile-sm {
  padding: 0.25rem 0.5rem; /* 버튼의 패딩 줄임 */
  font-size: 0.875rem; /* 폰트 사이즈 줄임 */
}
</style>