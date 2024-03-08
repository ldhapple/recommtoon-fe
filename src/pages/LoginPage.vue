<script>
import {reactive} from "vue";
import useAuthStore from "@/stores/authStore";
import axios from "axios";
import router from "@/router";

export default {
  name: 'LoginPage',
  setup() {
    const state = reactive({
      form: {
        username: '',
        password: ''
      }
    });

    const {setAuth} = useAuthStore();

    const submit = async () => {

      try {
        const response = await axios.post('/api/auth/login', state.form);
        const accessToken = response.headers['authorization']?.split(" ")[1];
        setAuth(accessToken, state.form.username);
        console.log('로그인 성공');
        router.push('/');
      } catch (error) {
        console.error('로그인 실패: ', error);
        window.alert("유효한 ID/Password가 아닙니다.");
      }
    };

    return {state, submit}
  }
}
</script>

<template>
  <section class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <div class="text-center mb-3">
                <a href="#!">
                  <img src="" alt="Logo" width="175" height="57">
                </a>
              </div>
              <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
              <form action="#!">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="text" class="form-control" name="username" id="username"
                             v-model="state.form.username"
                             placeholder="Id"
                             required>
                      <label for="text" class="form-label">Id</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" name="password" id="password"
                             v-model="state.form.password"
                             placeholder="Password" required>
                      <label for="password" class="form-label">Password</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex gap-2 justify-content-between">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe">
                        <label class="form-check-label text-secondary" for="rememberMe">
                          아이디 저장
                        </label>
                      </div>
                      <a href="#!" class="link-primary text-decoration-none">비밀번호 찾기</a>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid my-3">
                      <button class="btn btn-primary btn-lg" @click=submit() type="button">Log in</button>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="m-0 text-secondary text-center">계정이 없으신가요?
                      <router-link to="/register" class="link-primary text-decoration-none">회원 가입</router-link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>