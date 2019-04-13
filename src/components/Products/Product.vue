<template lang="pug">
  section.product.mt-3.ml-3.elevation-15(v-if='!loading')
    v-layout(raw, wrap)
      v-flex(xs12, lg6)
        img.product__img(:src='product.imageSrc')
      v-flex(xs12, lg6)
        .product__info
          h5.product__title.display-2.mb-4 {{ product.title }}
          p.product__price.mb-4
            span.product__price Цена: {{ product.price }} рублей
          .mb-5
            p.product__description.mb-2 Описание: {{ product.description }}
          app-edit-product(:product='product', v-if='isOwner')
          app-buy-dialog(:product='product')
</template>

<script>
import EditProduct from "./EditProduct";
export default {
  props: ["id"],
  computed: {
    product() {
      const id = this.id;
      return this.$store.getters.PRODUCT_BYID(id);
    },
    loading() {
      return this.$store.getters.LOADING;
    },
    isOwner() {
      return this.product.ownerId === this.$store.getters.USER.id;
    }
  },
  components: {
    appEditProduct: EditProduct
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #1c77ad;
  padding: 30px;
  margin-bottom: 100px;

  &__img {
    height: 100%;
    width: 100%;
  }
  &__info {
    margin-left: 30px;
  }
  &__title {
    font-size: 1.6rem;
    font-weight: bold;
    color: #1875d0;
    margin-bottom: 0;
  }
  &__price {
    font-size: 2rem;
    font-weight: bold;
    color: rgb(221, 51, 51);
  }
  &__description {
    font-size: 1.4rem;
    text-align: justify;
    color: rgb(47, 104, 29);
  }
}
</style>
