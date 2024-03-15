<template>
  <div class="webtoon-card"
       @mouseover="hover = true"
       @mouseleave="hover = false">
    <img :src="webtoon.imgSrc" class="card-img-top" alt="webtoon">
    <div class="card-info" v-if="hover">
      <button @click="goToWebtoonPage(webtoon.titleId)" class="btn btn-primary">Comments</button>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  props: ['webtoon'],
  data() {
    return {
      hover: false,
    };
  },
  setup() {
    const router = useRouter();
    const goToWebtoonPage = (titleId) => {
      router.push({name: 'WebtoonBoardPage', params: {titleId}});
    };
    return {
      goToWebtoonPage,
    };
  },
};
</script>

<style scoped>
@media (max-width: 361px) {
  .webtoon-card {
    flex: 0 0 45%;
    max-width: 50%;
  }
}

@media (max-width: 600px) {
  .webtoon-card {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (min-width: 601px) {
  .webtoon-card {
    flex: 0 0 calc(20% - 25px);
  }
}
</style>