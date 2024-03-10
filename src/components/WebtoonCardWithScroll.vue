<template>
    <div class="scroll-container">
      <button @click="scrollLeft" class="scroll-arrow left-arrow">&lt;</button>
      <div class="webtoon-card-container">
        <div class="webtoon-card"
             v-for="webtoon in webtoons" :key="webtoon.id"
             @mouseover="toggleHover(webtoon.id, true)"
             @mouseleave="toggleHover(webtoon.id, false)">
          <img :src="webtoon.image" class="card-img-top" alt="webtoon">
          <div class="card-info" v-if="webtoon.hover">
            <button class="btn btn-primary">Comments</button>
          </div>
        </div>
      </div>
      <button @click="scrollRight" class="scroll-arrow right-arrow">&gt;</button>
    </div>
</template>

<script>
import '@/assets/css/webtoon-card.css';

export default {
  data() {
    return {
      webtoons: [
        {
          id: 1,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        },
        {
          id: 2,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/648419/thumbnail/thumbnail_IMAG21_d9398229-cbfd-47dc-9208-0a6fb936f3a7.jpg',
          hover: false
        },
        {
          id: 3,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/733074/thumbnail/thumbnail_IMAG21_80df3e76-47af-4007-b57c-e8f2830835e5.jpg',
          hover: false
        },
        {
          id: 4,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/783052/thumbnail/thumbnail_IMAG21_800f4c56-26ac-419e-9ed0-baf322311dea.jpg',
          hover: false
        }, {
          id: 5,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
          hover: false
        }, {
          id: 6,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
          hover: false
        }, {
          id: 7,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
          hover: false
        }] // 여기에 웹툰 데이터 추가
    };
  },
  methods: {
    toggleHover(webtoonId, state) {
      const webtoon = this.webtoons.find(w => w.id === webtoonId);
      if (webtoon) webtoon.hover = state;
    },
    scrollLeft() {
      const container = this.$el.querySelector('.webtoon-card-container');
      container.scrollBy({left: -600, behavior: 'smooth'});
    },
    scrollRight() {
      const container = this.$el.querySelector('.webtoon-card-container');
      container.scrollBy({left: 600, behavior: 'smooth'});
    }
  }
};
</script>

<style scoped>

</style>