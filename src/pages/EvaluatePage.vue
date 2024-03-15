<script>
import StarRating from "@/components/StarRating.vue";
import axios from "@/axios";
import useAuthStore from "@/stores/authStore";

export default {
  name: 'HomePage',
  components: {StarRating},
  data() {
    return {
      evaluatedCount: 0, // 평가된 웹툰의 수
      webtoons: [],
      page: 0,
      size: 40,
      // sessionTimestamp: ''
      isLoading: false,
    };
  },
  mounted() {
    this.getWebtoons();
    this.createObserver();
    this.updateEvaluatedCount();
    // this.createSessionTimestamp();
  },
  computed: {
    progressPercent() {
      return (this.evaluatedCount / 100) * 100;
    }
  },
  methods: {
    async updateEvaluatedCount() {
      try {
        const response = await axios.get('/api/evaluation/count');
        this.evaluatedCount = response.data.response;
      } catch (error) {
        console.error(error);
      }
    },

    async updateRating(webtoonId, rating) {
      const username = useAuthStore().state.username;
      const data = {
        username,
        webtoonId,
        rating: rating.rating
      };

      try {
        await axios.post(`/api/evaluation`, data);
        const webtoon = this.webtoons.find(w => w.id === webtoonId);
        if (webtoon) {
          webtoon.rating = data.rating;
          webtoon.evaluated = true;
          this.updateEvaluatedCount();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getWebtoons() {
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const response = await axios.get(`/api/evaluation/card?page=${this.page}&size=${this.size}`);
        this.webtoons.push(...response.data.response.content);
        this.page++;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    createObserver() {
      const options = {
        root: null,
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.getWebtoons();
          }
        });
      }, options);

      observer.observe(this.$refs.loader);
    },
    // createSessionTimestamp() {
    //   const now = new Date();
    //   this.sessionTimestamp = now.toISOString();
    // }
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="p-5 mb-4 rounded-3">
      <div class="container-fluid py-5">
        <h4 class="fw-bold">AI 추천을 위해 10개 이상의 웹툰을 평가해주세요!</h4>
      </div>
    </div>

    <div class="progress-container mt-3">
      <div class="progress" style="height: 23px;">
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
            <img class="card-img-top" :src="webtoon.imgSrc" alt="Webtoon image">
            <div class="card-body">
              <StarRating :webtoon="webtoon" @rating-selected="rating => updateRating(webtoon.id, rating)"></StarRating>
            </div>
          </div>
        </div>
      </div>
      <div ref="loader" style="width: 100%; height: 20px;"></div>
    </div>
  </div>
</template>

<style scoped>

.card {
  position: relative;
  width: 100%;
}

.card-img-top {
  width: 100%;
  object-fit: cover;
}

.progress-container {
  position: fixed;
  margin-top: 30px;
  width: 90%;
}

/* PC 환경에서의 스타일 */
@media (min-width: 992px) {
  /* lg 브레이크포인트 - PC */
  .progress-container {
    width: 40%; /* PC에서는 너비 40% */
    margin-left: 6%; /* 중앙 정렬을 위해 */
  }
}

@media (min-width: 992px) {
  /* lg 브레이크포인트 - PC */
  .col-lg-1-5 {
    flex: 0 0 auto;
    width: 12.5%; /* 100 / 8 = 12.5% */
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  /* md 브레이크포인트 - 태블릿 */
  .col-md-4 {
    width: 25%; /* 3개 카드를 위한 수정 */
  }
}

@media (max-width: 767px) {
  /* sm 브레이크포인트 - 모바일 */
  .col-6 {
    width: 33.33333%; /* 모바일에서 3개 카드 */
  }
}

.evaluated .card {
  background-color: rgba(0, 0, 0, 0.7);
}

.progress-container {
  position: sticky;
  top: 10px; /* 메뉴바와의 간격 조정 */
  z-index: 1000; /* 필요시 다른 요소들 위에 나타나도록 z-index 조정 */
}

.container.mt-5 {
  margin-top: 100px; /* 위치 고정 바 높이에 따라 조정 */
}
</style>