<script>
import '@/assets/css/webtoon-card.css'
import axios from "@/axios";
import {useRouter} from "vue-router";

export default {
  data() {
    return {
      webtoons: [],
      requireRatingMessage: '',
      evaluatedCount: 0,
    };
  },
  mounted() {
    this.recommendations();
    this.updateEvaluatedCount();
  },
  methods: {
    toggleHover(titleId, state) {
      const webtoon = this.webtoons.find(w => w.titleId === titleId);
      if (webtoon) webtoon.hover = state;
    },

    async updateEvaluatedCount() {
      try {
        const response = await axios.get('/api/evaluation/count');
        this.evaluatedCount = response.data.response;
      } catch (error) {
        console.error(error);
      }
    },

    async recommendations() {
      try {
        const response = await axios.get('/api/recommendation');

        if (this.evaluatedCount >= 10) {
          this.webtoons = response.data.response;
        } else {
          this.webtoons = response.data.response;
          this.requireRatingMessage = '추천을 위해 10개 이상의 평가가 필요합니다. 아래는 개인별 추천이 아닌 MBTI별 장르 선호도에 따른 추천 웹툰입니다.'
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  setup() {
    const router = useRouter();
    const goToWebtoonPage = (titleId) => {
      router.push({name: 'WebtoonBoardPage', params: {titleId: titleId}});
    };

    return {
      goToWebtoonPage
    }
  }
}
</script>

<template>
  <div class="container py-4">
    <div class="p-5 mb-4 rounded-3">
      <div class="container-fluid py-5">
        <h4 class="text-center mb-4 fw-bold">딥 러닝 기반으로 추천된 나에게 꼭 맞는 웹툰을 알아보세요!</h4>

        <p v-if="requireRatingMessage" class="text-center text-danger">{{ requireRatingMessage }}</p>
      </div>
    </div>

    <div class="row g-3" v-if="webtoons.length > 0">
      <div class="webtoon-card col-lg-3 col-md-3 col-6" v-for="webtoon in webtoons" :key="webtoon.titleId"
           @mouseover="toggleHover(webtoon.titleId, true)"
           @mouseleave="toggleHover(webtoon.titleId, false)">
        <div class="card h-100">
          <img :src="webtoon.imgSrc" class="card-img-top" alt="웹툰 이미지">
          <div class="card-info" v-if="webtoon.hover">
            <button @click="goToWebtoonPage(webtoon.titleId)" class="btn btn-primary">Comments</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@media (max-width: 361px) {
  .webtoon-card {
    flex: 0 0 45%;
    max-width: 50%;
  }
}
</style>