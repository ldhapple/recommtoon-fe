<script>
import '@/assets/css/webtoon-card.css'

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
        },
        {
          id: 3,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/733074/thumbnail/thumbnail_IMAG21_80df3e76-47af-4007-b57c-e8f2830835e5.jpg',
        },
        {
          id: 4,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/783052/thumbnail/thumbnail_IMAG21_800f4c56-26ac-419e-9ed0-baf322311dea.jpg',
        }, {
          id: 5,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 6,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 7,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 8,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 9,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 10,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 11,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 12,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }, {
          id: 13,
          image: 'https://shared-comic.pstatic.net/thumb/webtoon/758037/thumbnail/thumbnail_IMAG21_15cb2611-34c0-4f02-a689-41d0b1016579.jpg',
        }],
    };
  },
  methods: {
    toggleHover(webtoonId, state) {
      const webtoon = this.webtoons.find(w => w.id === webtoonId);
      if (webtoon) webtoon.hover = state;
    }
  }
}
</script>

<template>
  <div class="container py-4">
    <h4 class="text-center mb-4">딥 러닝 기반으로 추천된 나에게 꼭 맞는 웹툰을 알아보세요!</h4>

    <div class="row g-3">
      <div class="webtoon-card col-lg-3 col-md-3 col-6" v-for="webtoon in webtoons" :key="webtoon.id"
           @mouseover="toggleHover(webtoon.id, true)"
           @mouseleave="toggleHover(webtoon.id, false)">
        <div class="card h-100">
          <img :src="webtoon.image" class="card-img-top" alt="웹툰 이미지">
          <div class="card-info" v-if="webtoon.hover">
            <button class="btn btn-primary">Comments</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped>
@media (max-width: 361px) {
  .webtoon-card {
    flex: 0 0 45%; /* 한 줄에 2개의 카드가 차지할 수 있도록 flex-basis 설정 */
    max-width: 50%; /* 한 줄에 2개의 카드가 차지할 수 있도록 최대 너비 설정 */
  }
}
</style>