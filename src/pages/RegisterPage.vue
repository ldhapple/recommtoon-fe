<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/router";

export default {
  name: 'RegisterPage',
  setup() {
    const state = reactive({
      form: {
        realName: '',
        username: '',
        nickname: '',
        password: '',
        gender: '',
        mbtiType: ''
      },

      prevForm: {},
      errorFields: {},
      validFields: {}
    })

    const savePrevForm = () => {
      state.prevForm = {...state.form}
    }

    const checkDuplicate = (field) => {
      const value = state.form[field];
      if (!value) {
        window.alert(`${field}를 입력해주세요.`);
        return;
      }

      axios.get(`/api/account/checkDuplicate/${field}/${value}`).then(res => {
        if (res.data) {
          window.alert(`사용 가능`);
          state.validFields[field] = true;
          delete state.errorFields[field];
        } else {
          window.alert(`이미 사용 중 입니다.`)
          state.errorFields[field] = true;
          delete state.validFields[field];
        }
      }).catch(error => {
        console.error('중복 체크 실패: ', error);
      });
    }

    const submit = () => {
      axios.post('/api/account/register', state.form).then(res => {
        console.log(res);

        if (res.status === 200) {
          router.push('/login');
        }
      }).catch(error => {
        console.error('회원 가입 실패: ', error);
        window.alert("중복 체크를 해주세요.");

        state.form = {...state.prevForm};
      });
    }
    return {state, submit, checkDuplicate, savePrevForm}
  }
}
</script>

<template>
  <div class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <div class="row">
              <div class="col-12">
                <div class="mb-5">
                  <h2 class="h3">회원 가입</h2>
                  <h3 class="fs-6 fw-normal text-secondary m-0">Enter your details to register</h3>
                </div>
              </div>
            </div>
            <form action="#!">
              <div class="row gy-3 gy-md-4 overflow-hidden">
                <div class="col-12">
                  <label for="realname" class="form-label">이름 <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" name="realname" id="realname" v-model="state.form.realName"
                         placeholder="홍길동"
                         required>
                </div>
                <div class="col-9">
                  <label for="username" class="form-label">아이디 <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" name="username" id="username" v-model="state.form.username"
                         placeholder="Id"
                         required
                         :class="{ 'input-error': state.errorFields['username'], 'input-success': state.validFields['username'] }">
                </div>
                <div class="col-3 d-flex align-items-center">
                  <button class="btn btn-primary" @click="checkDuplicate('username')">중복 체크</button>
                </div>
                <div class="col-9">
                  <label for="nickname" class="form-label">닉네임 <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" name="nickname" id="nickname" v-model="state.form.nickname"
                         placeholder="닉네임"
                         required
                         :class="{ 'input-error': state.errorFields['nickname'], 'input-success': state.validFields['nickname'] }">
                </div>
                <div class="col-3 d-flex align-items-center">
                  <button class="btn btn-primary" @click="checkDuplicate('nickname')">중복 체크</button>
                </div>
                <div class="col-12">
                  <label for="password" class="form-label">비밀번호 <span class="text-danger">*</span></label>
                  <input type="password" class="form-control" name="password" id="password"
                         v-model="state.form.password" value="" required>
                </div>
                <div class="col-12">
                  <label class="form-label">성별 <span class="text-danger">*</span></label>
                  <div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="gender" id="genderMale"
                             v-model="state.form.gender" value="male" required>
                      <label class="form-check-label" for="genderMale">남성</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="gender" id="genderFemale"
                             v-model="state.form.gender" value="female"
                             required>
                      <label class="form-check-label" for="genderFemale">여성</label>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <label for="mbti" class="form-label">MBTI <span class="text-danger">*</span></label>
                  <select class="form-select" id="mbti" v-model="state.form.mbtiType" name="mbti" required>
                    <option value="">선택...</option>
                    <option value="istj">ISTJ</option>
                    <option value="isfj">ISFJ</option>
                    <option value="infj">INFJ</option>
                    <option value="intj">INTJ</option>
                    <option value="istp">ISTP</option>
                    <option value="isfp">ISFP</option>
                    <option value="infp">INFP</option>
                    <option value="intp">INTP</option>
                    <option value="estp">ESTP</option>
                    <option value="esfp">ESFP</option>
                    <option value="enfp">ENFP</option>
                    <option value="entp">ENTP</option>
                    <option value="estj">ESTJ</option>
                    <option value="esfj">ESFJ</option>
                    <option value="enfj">ENFJ</option>
                    <option value="entj">ENTJ</option>
                  </select>
                </div>
                <div class="col-12">
                  <div class="d-grid">
                    <button class="btn btn-lg btn-primary" @click="savePrevForm(); submit()" type="button">
                      회원가입
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-12">
                <hr class="mt-5 mb-4 border-secondary-subtle">
                <div class="col-12">
                  <p class="m-0 text-secondary text-center">이미 계정이 있으신가요?
                    <router-link to="/login" class="link-primary text-decoration-none">로그인</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-error {
  border: 1px solid red;
}

.input-success {
  border: 1px solid blue;
}
</style>