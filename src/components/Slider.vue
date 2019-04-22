<template lang="pug">
  div
    button.slider__prev(@click='prevSlide') &#x25C4;
    button.slider__next(@click='nextSlide') &#x25BA;
    .slider.js-slider
      .slider__body(:style="{ left: sliderOffsetLeft + 'px' }")
        .slider__slide.js-slide(v-for='(slide, i) in sliderList', :key='i', :style="'background-image: url(' + slide.img + ')'")
</template>

<script>
export default {
  data() {
    return {
      // Всего слайдов
      sliderAllCount: 0,
      // Номер активного слайда
      sliderActive: 1,
      // Отступ тела со слайдами в контейнере
      sliderOffsetLeft: 0,
      // Шаг слайда равен его длине
      sliderOffsetStep: 0,
      sliderList: [
        {
          img:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-LauijzIHdwvbFTAdtOR..jpg?alt=media&token=b3cb5016-88dd-4f30-83bb-f7c64c0d5d61"
        },
        {
          img:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-LaujIxgk9B0KZkzQMh9..jpg?alt=media&token=a4c3dd18-4477-4450-a9b1-dd0b8e2fb2f2"
        },
        {
          img:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-Lauiq0gKbygKWZGW0yI..jpg?alt=media&token=8b44ca9b-f4d5-4c1b-80e8-ee1f90ef1433"
        },
        {
          img:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-Lauj-ygXiRmdFaZjMax..jpg?alt=media&token=c75cca64-dfcf-4508-98f6-b1feffe5ed2e"
        }
      ]
    };
  },

  methods: {
    // Иницилизация слайдера
    initSlider: function() {
      // Получаем элементы сладера и его слайдов
      let sliderBody = this.$el.querySelector(".js-slider");
      let sliderSlidies = sliderBody.querySelectorAll(".js-slide");
      // Записываем длину одного слайда для перелистывания
      this.sliderOffsetStep = sliderBody.clientWidth;
      // Общее количество слайдов для стопов
      this.sliderAllCount = sliderSlidies.length;
    },

    // Открываем слайд по номеру
    openSlide: function(id) {
      if (id > 0 && id <= this.sliderAllCount) {
        this.sliderActive = id;
        // Сдвигаем элемент со слайдами
        this.sliderOffsetLeft = -(
          this.sliderActive * this.sliderOffsetStep -
          this.sliderOffsetStep
        );
      }
    },

    prevSlide: function() {
      if (this.sliderActive < this.sliderAllCount) {
        this.sliderActive += 1;
        this.openSlide(this.sliderActive);
      }
    },

    nextSlide: function() {
      if (this.sliderActive > 1) {
        this.sliderActive -= 1;
        this.openSlide(this.sliderActive);
      }
    }
  },

  mounted() {
    this.initSlider();

    // Перенастройка слайдера при ресайзе окна
    window.addEventListener("resize", () => {
      this.initSlider();
      this.openSlide(this.sliderActive);
    });
  }
};
</script>

<style lang="scss" scoped>
$slider-height: 400px;
$slide-width: 100%;

.slider {
  width: 100%;
  height: $slider-height;
  position: relative;
  overflow: hidden;

  &__body {
    min-width: auto;
    height: $slider-height;
    display: flex;
    position: relative;
    align-items: stretch;
    transition: all 0.5s ease;
  }

  &__slide {
    min-width: $slide-width;
    height: $slider-height;
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
