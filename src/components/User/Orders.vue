<template lang="pug">
v-container
  v-layout(row='')
    v-flex.text-xs-center.pt-5(xs12='', v-if='loading')
      v-progress-circular(:size='100', :width='4', color='purple', indeterminate='')
    v-flex(xs12='', sm6='', offset-sm3='', v-else-if='!loading && orders.length !== 0')
      h1.text--secondary.mb-3 Orders
      v-list(subheader='', two-line='')
        v-list-tile(avatar='', v-for='(order, i) in orders', :key='i')
          v-list-tile-action
            v-checkbox(color='success', :input-value='order.done', @change='markDone(order)')
          v-list-tile-content
            v-list-tile-title {{ order.name }}
            v-list-tile-sub-title {{ order.phone }}
          v-list-tile-action
            v-btn.primary(:to="'/product/' + order.productId") Open
    v-flex.text-xs-center(xs12='', v-else='')
      h1.text--secondary You have no orders
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.LOADING;
    },
    orders() {
      return this.$store.getters.ORDERS;
    }
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("ORDER_MARKDONE", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    }
  },
  created() {
    this.$store.dispatch("ORDERS_FETCH");
  }
};
</script>
