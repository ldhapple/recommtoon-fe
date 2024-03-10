<template>
  <div class="webtoon-card-container">
    <div class="webtoon-card"
         v-for="webtoon in webtoons" :key="webtoon.titleId"
         @mouseover="toggleHover(webtoon.titleId, true)"
         @mouseleave="toggleHover(webtoon.titleId, false)">
      <img :src="webtoon.image" class="card-img-top" alt="webtoon">
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
      webtoons: [
        {
          titleId: '758037',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        },
        {
          titleId: '648419',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/648419/thumbnail/thumbnail_IMAG21_d9398229-cbfd-47dc-9208-0a6fb936f3a7.jpg',
          hover: false
        },
        {
          titleId: '733074',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/733074/thumbnail/thumbnail_IMAG21_80df3e76-47af-4007-b57c-e8f2830835e5.jpg',
          hover: false
        },
        {
          titleId: '783052',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/783052/thumbnail/thumbnail_IMAG21_800f4c56-26ac-419e-9ed0-baf322311dea.jpg',
          hover: false
        }, {
          titleId: '758037',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
          hover: false
        }, {
          titleId: '758037',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
          hover: false
        }, {
          titleId: '758037',
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
          hover: false
        }]
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

</style>