<template lang="pug">
.home
  carousel
    carousel-slide(v-for="slide in slides")
      .home__slide {{ slide.title }}
      img(:src="slide.imageSrc" width="100%" height="850px")
  h2.home__header Купи прямо сейчас!
  .home__card-row
    product-card.home__card(v-for='(product, i) in products', :key='i', :product='product', @buy='setProduct')
  modal-buy(v-if='product', :product='product', @close='setProduct(null)')
</template>

<script>
export default {
  data() {
    return {
      product: null,
      slides: [
        {
          title: "Привет участникам соревнований!!!",
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-LauijzIHdwvbFTAdtOR..jpg?alt=media&token=b3cb5016-88dd-4f30-83bb-f7c64c0d5d61"
        },
        {
          title: "Товарищи",
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-LaujIxgk9B0KZkzQMh9..jpg?alt=media&token=a4c3dd18-4477-4450-a9b1-dd0b8e2fb2f2"
        },
        {
          title: "Ура",
          imageSrc:
            "https://firebasestorage.googleapis.com/v0/b/itc-ads-a3932.appspot.com/o/products%2F-Lauiq0gKbygKWZGW0yI..jpg?alt=media&token=8b44ca9b-f4d5-4c1b-80e8-ee1f90ef1433"
        }
      ]
    };
  },
  computed: {
    products() {
      return this.$store.state.products.products;
    }
  },
  methods: {
    setProduct(product) {
      this.product = product;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 1980px;
  margin: -10px auto;
  padding: 0 30px;
  background-color: rgb(219, 247, 214);
  z-index: 0;

  &__header {
    font-size: 50px;
    color: rgb(255, 72, 0);
    text-align: center;
    margin-top: 15px;
  }
  &__card-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }
  &__card {
    z-index: 9;
    background-color: rgb(236, 238, 153);
  }
  &__slide {
    position: absolute;
    top: 75%;
    left: 0;
    right: 0;
    text-align: center;
    color: rgb(238, 122, 122);
    font-weight: bold;
    font-size: 60px;
    padding: 5px -30px;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

@media screen and (max-width: 1280px) {
  img {
    height: 600px;   
  }
  .home__slide {
    font-size: 50px;
  }
}
@media screen and (max-width: 960px) {
  img {
    height: 500px;
  }
  .home__slide {
    font-size: 40px;
  }
}
@media screen and (max-width: 600px) {
  img {
    height: 400px;  
  }
  .home__slide {
    font-size: 30px;
  }
}
@media screen and (max-width: 500px) {
  img {
    height: 300px;  
  }
  .home__slide {
    font-size: 20px;
  }
}
</style>
