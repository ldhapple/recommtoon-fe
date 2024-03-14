<template>
  <div class="webtoon-card-container">
    <div class="webtoon-card"
         v-for="webtoon in webtoons" :key="webtoon.titleId"
         @mouseover="toggleHover(webtoon.titleId, true)"
         @mouseleave="toggleHover(webtoon.titleId, false)">
      <img :src="webtoon.imgSrc" class="card-img-top" alt="webtoon">
      <div class="card-info" v-if="webtoon.hover">
        <button @click="goToWebtoonPage(webtoon.titleId)" class="btn btn-primary">Comments</button>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/webtoon-card.css';
import {useRouter} from "vue-router";

export default {
  data() {
    return {
      webtoons: []
    };
  },
  methods: {
    toggleHover(titleId, state) {
      const webtoon = this.webtoons.find(w => w.titleId === titleId);
      if (webtoon) webtoon.hover = state;
    },
  },
  setup() {
    const router = useRouter();
    const goToWebtoonPage = (titleId) => {
      router.push({ name: 'WebtoonBoardPage', params: { titleId: titleId } });
    };

    return {
      goToWebtoonPage
    }
  }
};
</script>

<style scoped>
@media (max-width: 361px) {
  .webtoon-card {
    flex: 0 0 45%; /* 한 줄에 2개의 카드가 차지할 수 있도록 flex-basis 설정 */
    max-width: 50%; /* 한 줄에 2개의 카드가 차지할 수 있도록 최대 너비 설정 */
  }
}
</style>