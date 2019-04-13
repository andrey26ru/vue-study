<template lang="pug">
  .slider
    button.slider__prev(@click='prevSlide') &#x25C4;
    button.slider__next(@click='nextSlide') &#x25BA;
    .slider__frame(ref='frame')
      .slider__list(:style="{ left: sliderOffsetLeft }")
        .slider__slide(v-for='(slide, i) in list', :key='i', :style="'background-image: url(' + slide.img + ')'")
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      active: 0
    };
  },

  computed: {
    offsetLeft() {
      return -(this.sliderActive * this.$refs.frame.clientWidth) + "px";
    }
  },

  methods: {
    // Открываем слайд по номеру
    openSlide(index) {
      if (index >= this.sliderList.length) index = 0;
      else if (index < 0) index = this.sliderList.length - 1;
      this.sliderActive = index;
    },

    prevSlide() {
      this.openSlide(this.sliderActive + 1);
    },

    nextSlide() {
      this.openSlide(this.sliderActive - 1);
    }
  },

  mounted() {
    // Перенастройка слайдера при ресайзе окна
    window.addEventListener("resize", () => {
      this.openSlide(this.sliderActive);
    });
  }
};
</script>

<style lang="scss" scoped>
$slider-height: 400px;

.slider {
  height: $slider-height;

  &__frame {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  &__list {
    min-width: auto;
    height: 100%;
    display: flex;
    position: relative;
    align-items: stretch;
    transition: all 0.5s ease;
  }

  &__slide {
    min-width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    flex: 1 100%;
  }

  &__prev {
    position: absolute;
    top: 180px;
    left: 60px;
    z-index: 1;
    font-size: 40px;
    background-color: #8a79c5;
    padding: 2px 8px;
    border-radius: 60%;
  }

  &__next {
    position: absolute;
    top: 180px;
    right: 60px;
    z-index: 1;
    font-size: 40px;
    background-color: #8a79c5;
    padding: 2px 8px;
    border-radius: 50%;
  }

  &__prev:focus,
  &__next:focus {
    outline: none;
  }
}
</style>
