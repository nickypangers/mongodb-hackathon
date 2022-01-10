<template>
  <div class="bg-white p-3">
    <p>Cart Overview</p>
    <div class="grid grid-cols-1 gap-3 my-3">
      <checkout-side-bar-item
        v-for="item in items"
        :key="item.id"
        :product="item"
      />
    </div>
    <p class="text-right">Total: {{ formatPrice(cartTotal) }}</p>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CheckoutSidebar',
  mixins: [global],
  computed: {
    items() {
      return this.$store.state.cart.items
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
  },
}
</script>
