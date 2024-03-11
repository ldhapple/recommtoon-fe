<script setup>

import {onMounted, ref} from "vue";
import axios from "@/axios";
import {useRoute} from "vue-router";

const route = useRoute();
const titleId = ref(route.params.titleId);
const webtoonDetails = ref({});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/board/${titleId.value}`);
    webtoonDetails.value = response.data.response;
  } catch (error) {
    console.error(error);
  }
})

function openLinkInPopup(link) {
  window.open(link, 'WebtoonPopup', 'width=800,height=600');
}

</script>

<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="webtoonDetails.imgSrc" class="img-fluid rounded-start" alt="Webtoon Image">
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="card-body">
          <h2 class="card-title">{{ webtoonDetails.title }}</h2>
          <span><br></span>
          <p class="card-text">{{ webtoonDetails.story }}</p>
          <p class="small text-muted">{{ webtoonDetails.author }}</p>
        </div>
        <div class="mt-auto p-3">
          <a href="#" @click="openLinkInPopup(webtoonDetails.link)" class="btn btn-primary align-self-end">웹툰으로 이동</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>