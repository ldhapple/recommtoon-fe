<script>
import WebtoonCardWithScroll from "@/components/WebtoonCardWithScroll.vue";

export default {
  name: 'HomePage',
  components: {WebtoonCardWithScroll},
  data() {
    return {
      mbtis: [
        {type: 'ISTJ'},
        {type: 'ESTJ'},
        {type: 'ISFJ'},
        {type: 'ESFJ'},
        {type: 'ISFP'},
        {type: 'ESFP'},
        {type: 'ISTP'},
        {type: 'ESTP'},
        {type: 'INTJ'},
        {type: 'ENTJ'},
        {type: 'INFJ'},
        {type: 'ENFJ'},
        {type: 'INFP'},
        {type: 'ENFP'},
        {type: 'INTP'},
        {type: 'ENTP'}
      ]
    }
  }
}
</script>

<template>
  <div class="container mt-4">
    <div class="p-5 mb-4 rounded-3">
      <div class="container-fluid py-5">
        <h6 class="fw-bold">나이, 성별, MBTI, <span class="mobile-break"><br></span> 웹툰 평가 내용을 바탕으로 <span
            class="desktop-break"> <br> </span>
          <span class="mobile-break"><br></span> 나한테 딱 맞는 웹툰을 <span class="mobile-break"><br></span> 추천받고 지인과 공유하세요.
        </h6>
      </div>

      <div class="container">
        <h2 class="section-title">MBTI별 선호 웹툰</h2>
        <hr class="my-4">
        <div v-for="mbti in mbtis" :key="mbti.type" class="mbti-section">
          <h2>{{ mbti.type }}</h2>
          <WebtoonCardWithScroll :mbtiType="mbti.type"/>
          <hr class="my-4">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>