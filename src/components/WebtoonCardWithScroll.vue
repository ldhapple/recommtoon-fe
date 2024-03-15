<template>
  <div class="scroll-container">
    <button @click="scrollLeft" class="scroll-arrow left-arrow">&lt;</button>
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
    <button @click="scrollRight" class="scroll-arrow right-arrow">&gt;</button>
  </div>
</template>

<script>
import '@/assets/css/webtoon-card.css';
import {useRouter} from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      webtoons: []
    };
  },
  props: ['mbtiType'],
  mounted() {
    this.fetchWebtoons(this.mbtiType);
  },
  methods: {
    toggleHover(titleId, state) {
      const webtoon = this.webtoons.find(w => w.titleId === titleId);
      if (webtoon) webtoon.hover = state;
    },
    scrollLeft() {
      const container = this.$el.querySelector('.webtoon-card-container');
      container.scrollBy({left: -600, behavior: 'smooth'});
    },
    scrollRight() {
      const container = this.$el.querySelector('.webtoon-card-container');
      container.scrollBy({left: 600, behavior: 'smooth'});
    },
    async fetchWebtoons(mbtiType) {
      try {
        const response = await axios.get(`/api/mbti/favorite/${mbtiType}`);
        this.webtoons = response.data.response;
      } catch (error) {
        console.error(mbtiType, error);
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
};
</script>

<style scoped>

</style>