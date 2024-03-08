<script>
import StarRating from "@/components/StarRating.vue";

export default {
  name: 'HomePage',
  components: {StarRating},
  data() {
    return {
      evaluatedCount: 33, // 평가된 웹툰의 수
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
        }]
    };
  },
  computed: {
    progressPercent() {
      return (this.evaluatedCount / 100) * 100;
    }
  },
  methods: {
    updateRating(data) {
      const webtoon = this.webtoons.find(w => w.id === data.id);
      if (webtoon) {
        webtoon.rating = data.rating;
        webtoon.evaluated = true;
      }
    }
  }
}
</script>

<template>
  <div class="progress-container mt-3">
    <div class="progress" style="height: 20px;">
      <div class="progress-bar" role="progressbar" :style="{width: progressPercent + '%'}" aria-valuenow="25"
           aria-valuemin="0" aria-valuemax="100">{{ evaluatedCount }}
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-1-5 col-md-4 col-6" v-for="webtoon in webtoons" :key="webtoon.id"
           :class="{ 'evaluated': webtoon.evaluated }">
        <div class="card">
          <img class="card-img-top" :src="webtoon.image" alt="Webtoon image">
          <div class="card-body">
            <StarRating :webtoon="webtoon" @rating-selected="updateRating"></StarRating>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.card {
  position: relative; /* 상대 위치 지정 */
  width: 100%; /* 카드의 너비 */
}

.card-img-top {
  width: 100%;
  object-fit: cover; /* 카드 크기에 맞게 이미지 채우기 */
}

.progress-container {
  margin-top: 30px; /* 최상단에서 아래로 조금 떨어져 있도록 조정 */
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

/* PC 환경에서의 스타일 */
@media (min-width: 992px) { /* lg 브레이크포인트 - PC */
  .progress-container {
    width: 40%; /* PC에서는 너비 40% */
    margin-left: 6%; /* 중앙 정렬을 위해 */
  }
}

@media (min-width: 992px) { /* lg 브레이크포인트 - PC */
  .col-lg-1-5 {
    flex: 0 0 auto;
    width: 12.5%; /* 100 / 8 = 12.5% */
  }
}

@media (min-width: 768px) and (max-width: 991px) { /* md 브레이크포인트 - 태블릿 */
  .col-md-4 {
    width: 25%; /* 3개 카드를 위한 수정 */
  }
}

@media (max-width: 767px) { /* sm 브레이크포인트 - 모바일 */
  .col-6 {
    width: 33.33333%; /* 모바일에서 3개 카드 */
  }
}

.evaluated .card {
  background-color: rgba(0, 0, 0, 0.2); /* 평가된 카드의 배경 색상 */
}
</style>