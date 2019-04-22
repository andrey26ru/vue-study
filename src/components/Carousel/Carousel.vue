<template lang="pug">
.carousel
  slot
  button.carousel__nav.carousel__nav--prev(@click.prevent="prev") 
  button.carousel__nav.carousel__nav--next(@click.prevent="next") 
  .carousel__pagination
    button(v-for="n in slidesCount" @click="goto(n-1)" :class="{ active: n-1 == index }")
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      slides: [],
      direction: null
    };
  },
  mounted() {
    this.slides = this.$children;
    this.slides.forEach((slide, i) => {
      return (slide.index = i);
    });
  },
  computed: {
    slidesCount() {
      return this.slides.length;
    }
  },
  methods: {
    prev() {
      this.index--;
      this.direction = "left";
      if (this.index < 0) {
        this.index = this.slidesCount - 1;
      }
    },
    next() {
      this.index++;
      this.direction = "right";
      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    },
    goto(index) {
      this.direction = index > this.index ? "right" : "left";
      this.index = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  overflow: hidden;
  &__nav {
    position: absolute;
    top: 50%;
    width: 64px;
    height: 64px;
  }
  &__nav--prev {
    background: url(prev.png);
    left: 10px;
  }
  &__nav--next {
    background: url(next.png);
    right: 10px;
  }
  &__nav--prev:focus,
  &__nav--next:focus {
    outline: none;
  }
  &__pagination {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
  &__pagination button {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: rgb(104, 82, 82);
    opacity: 0.8;
    border-radius: 50%;
    margin: 0 3px;
  }
  &__pagination button.active {
    background-color: #fff;
  }
  &__pagination button:focus {
    outline: none;
  }
}
</style>
