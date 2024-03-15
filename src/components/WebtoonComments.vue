<script setup>
import {onMounted, ref} from "vue";
import axios from "@/axios";
import {useRoute} from "vue-router";
import router from "@/router";

const route = useRoute();
const comments = ref([]);
const newComment = ref('');

onMounted(async () => {
  await loadComments();
});

const loadComments = async () => {
  try {
    const response = await axios.get(`/api/comments/${route.params.titleId}`);
    comments.value = response.data.response;
  } catch (error) {
    console.log(error);
  }
};

const submitComment = async () => {
  try {
    await axios.post(`/api/comments/new/${route.params.titleId}`, {
      content: newComment.value
    });
    newComment.value = '';
    await loadComments();
  } catch (error) {
    window.alert("로그인이 필요한 서비스입니다.");
    router.push('/login');
    console.error(error);
  }
}

const thumbsUp = async (commentId) => {
  try {
    await axios.post(`/api/comments/like/${commentId}`);
    const updatedComments = comments.value.map((comment) => {
      if (comment.id === commentId) {
        return {...comment, isLiked: true, likeCount: comment.likeCount + 1};
      }
      return comment;
    });
    comments.value = updatedComments;
  } catch (error) {
    window.alert("로그인이 필요한 서비스입니다.");
    router.push('/login');
    console.error(error);
  }
}
</script>

<template>
  <div class="mb-4">
    <h5>댓글</h5>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="댓글을 입력해주세요." v-model="newComment">
      <button class="btn btn-primary" type="button" @click="submitComment">등록</button>
    </div>
  </div>

  <section>
    <div class="container my-5 py-5 text-dark">
      <div class="row d-flex justify-content-center">
        <div class="col-md-11 col-lg-9 col-xl-7">
          <div v-for="comment in comments" :key="comment.id" class="d-flex flex-start mb-4">
            <div class="card mb-3">
              <div class="card-body p-4">
                <div class="comment">
                  <h5>{{ comment.nickName }}</h5>
                  <p class="small">{{ comment.writeTime }}</p>
                  <p>{{ comment.content }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <a href="#!" class="link-muted me-2"
                         @click.prevent="thumbsUp(comment.id)" :class="{'text-primary': comment.isLiked}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                          <path
                              d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                        {{ comment.likeCount }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="comments.length === 0" class="no-comments">
            아직 댓글이 없습니다. 웹툰에 대한 평가를 남겨주세요!
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card.mb-3 {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>