<script>
import WebtoonCard from "@/components/WebtoonCard.vue";

export default {
  name: 'HomePage',
  components: {WebtoonCard}
}
</script>

<template>
  <main class="container mt-4">
    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h6 class="fw-bold">나이, 성별, MBTI, <span class="mobile-break"><br></span> 웹툰 평가 내용을 바탕으로 <span
            class="desktop-break"> <br> </span>
          <span class="mobile-break"><br></span> 나한테 딱 맞는 웹툰을 <span class="mobile-break"><br></span> 추천받고 지인과 공유하세요.
        </h6>
      </div>

      <div class="container">
        <WebtoonCard/>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>