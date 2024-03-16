<template>
  <div class="friend-webtoon-page container mt-4">
    <div class="p-5 mb-4 rounded-3">
      <div class="container-fluid py-5">
        <h2 class="fw-bold">친구가 본 웹툰을 알아보세요!</h2>
        <p>남성이 많이 평가한 웹툰,<br> 나이가 20세인 사람들,<br> 28세의 여성이 많이 평가한 웹툰도 검색 가능합니다.</p>
      </div>
    </div>
    <div class="search-options mt-3">
      <div class="row g-3">
        <div class="col-sm">
          <input v-model="searchName" placeholder="이름" class="form-control"/>
        </div>
        <div class="col-sm">
          <select v-model="selectedGender" class="form-select">
            <option value="">성별</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div class="col-sm">
          <input type="number" v-model.number="selectedAge" placeholder="나이" class="form-control"/>
        </div>
        <div class="col-sm-auto">
          <button @click="searchFriendsWebtoons" class="btn btn-primary">검색</button>
        </div>
      </div>
    </div>
    <div class="webtoon-list d-flex flex-wrap gap-2 mt-4">
      <WebtoonCardWithRating
          v-for="webtoon in webtoons"
          :key="webtoon.titleId"
          :webtoon="webtoon"/>
    </div>
    <hr class="my-4">
    <div v-if="webtoons.length === 0">
      <h3>검색 결과가 없습니다.</h3>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <button @click="searchFriendsWebtoons(page)" class="page-link">{{ page }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import WebtoonCardWithRating from "@/components/WebtoonCardWithRating.vue";
import axios from "axios";

export default {
  components: {WebtoonCardWithRating},
  data() {
    return {
      searchName: '',
      selectedGender: '',
      selectedAge: null,
      webtoons: {content: [], totalPages: 0},
      currentPage: 1,
      totalPages: 0,
    };
  },
  mounted() {
    this.searchFriendsWebtoons();
  },
  methods: {
    async searchFriendsWebtoons(page = 1) {
      const params = {
        name: this.searchName.trim(),
        gender: this.selectedGender,
        age: this.selectedAge ? this.selectedAge : undefined,
        page: page - 1,
        size: 50,
      };
      try {
        const response = await axios.get('/api/webtoons/friends-webtoon', {params});
        this.webtoons = response.data.response.content;
        this.totalPages = response.data.response.totalPages;
        this.currentPage = page;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped>
.search-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar, select {
  padding: 10px;
  box-sizing: border-box;
}

.webtoon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>