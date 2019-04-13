<template lang="pug">
.card
  router-link(:aria-label='product.title', :to="'/product/' + product.id")
    v-img(:src='product.imageSrc', aspect-ratio='1.5')
  h2.card__heading {{ product.title }}
  .card__describe
    p.card__price
      span.title Цена:
      |   {{ product.price }} рублей
  router-link(:to="'/product/' + product.id")
    button.card__button-describe Подробнее
  a.card__button-buy(@click="$emit('buy', product)") Купить
</template>

<script>
export default {
  props: ["product"]
};
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  text-align: center;
  width: calc(100% / 12 * 3 - 30px);
  margin: 15px;
  border: 1px solid #c5c3cc;

  &__heading {
    text-align: center;
    font-weight: bold;
    word-wrap: break-word;
    font-size: 30px;
    margin: 15px 0;
  }
  &__describe {
    margin-top: 10px;
    padding-left: 1rem;
  }
  &__price {
    color: #fc0e1e;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  &__button-describe {
    color: #2629f5;
    border: 1px solid #2629f5;
    padding: 8px 23px;
    border-radius: 20px;
    font-size: 1.2rem;
    transition: all 0.5s ease;
  }
  &__button-buy {
    background: #013c74;
    color: rgb(255, 255, 255);
    text-align: center;
    display: inline-block;
    padding: 8px 23px;
    text-decoration: none;
    font-size: 1.2rem;
    border-radius: 20px;
    transition: all 0.5s ease;
    margin: 10px 0 30px 10px;
  }
  &__button-describe:focus,
  &__button-buy:focus {
    outline: none;
  }
  &__button-buy:hover {
    background: rgb(92, 94, 224);
  }
  &__button-describe:hover {
    background: rgb(241, 236, 184);
  }
}

@media screen and (max-width: 1280px) {
  .card {
    width: calc(100% / 12 * 4 - 30px);
  }
}
@media screen and (max-width: 960px) {
  .card {
    width: calc(100% / 12 * 6 - 30px);
  }
}
@media screen and (max-width: 600px) {
  .card {
    width: calc(100% / 12 * 12 - 30px);
  }
}
</style>
