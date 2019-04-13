<template lang="pug">
.container
  slider
    slider-item(v-for='(slide, i) in slideList' :key='i')

  h2.header Купи прямо сейчас!
  .row
    product-card.card(v-for='(product, i) in products', :key='i', :product='product', @buy='setProduct')
  modal-buy(v-if='product', :product='product', @close='setProduct(null)')
</template>

<script>
export default {
  data() {
    return {
      product: null,
      slideList: [
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
  computed: {
    products() {
      return this.$store.state.products.products;
    }
  },
  methods: {
    setProduct(product) {
      console.log("Установлен", product);

      this.product = product;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1980px;
  margin: 0 auto;
  padding: 0 30px;
  background-color: rgb(231, 250, 218);
  z-index: 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}
.header {
  font-size: 35px;
  color: rgb(255, 72, 0);
  text-align: center;
  margin-top: 15px;
}
.card {
  z-index: 9;
  background-color: rgb(236, 238, 153);
}
</style>
