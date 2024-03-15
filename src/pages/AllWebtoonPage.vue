<template>
  <div class="webtoon-search-page container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 d-flex">
        <input v-model="searchQuery" placeholder="웹툰 제목 검색" class="form-control me-2"/>
        <button @click="fetchWebtoons" class="btn btn-primary">Search</button>
      </div>
    </div>
    <div class="webtoon-list d-flex flex-wrap gap-2 mt-5">
      <WebtoonCard
          v-for="webtoon in webtoons.content"
          :key="webtoon.titleId"
          :webtoon="webtoon"
      />
    </div>
    <hr class="my-4">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <button @click="fetchWebtoons(page)" class="page-link">{{ page }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import axios from "axios";
import WebtoonCard from "@/components/WebtoonCard.vue";

export default {
  components: {WebtoonCard},
  data() {
    return {
      searchQuery: '',
      webtoons: {content: [], totalPages: 0},
      currentPage: 1,
      totalPages: 0,
    };
  },
  mounted() {
    this.fetchWebtoons();
  },
  methods: {
    async fetchWebtoons(page = 1) {
      try {
        const response = await axios.get('/api/webtoons', {
          params: {
            searchParam: this.searchQuery.trim(),
            page: page - 1,
            size: 50
          }
        });
        this.webtoons = response.data.response;
        this.totalPages = Array.from({length: response.data.response.totalPages}, (_, i) => i + 1);
        this.currentPage = page;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.webtoon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>