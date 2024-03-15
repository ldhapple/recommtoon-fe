<template>
  <div class="star-rating">
    <span v-for="star in stars" :key="star" @click="rate(star)" class="star"
          v-bind:class="{ filled: webtoon.rating >= star }">&#9733;</span>
  </div>
</template>

<script>
export default {
  props: ['webtoon'],
  data() {
    return {
      stars: [1, 2, 3, 4, 5], // 별점 배열
    };
  },
  methods: {
    rate(score) {
      this.$emit('rating-selected', {id: this.webtoon.id, rating: score});
    }
  }
}
</script>

<style>
.star {
  cursor: pointer;
  color: gray;
}

.star-rating {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 96.5%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card:hover .star-rating {
  opacity: 1;
}

.filled {
  color: orange;
}
</style>