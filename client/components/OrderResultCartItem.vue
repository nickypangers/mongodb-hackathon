<template>
  <div class="flex items-center">
    <div class="w-28">
      <img :src="getProductImage(product.category)" alt="product" />
    </div>
    <div class="ml-3">
      <h3>{{ product.name }}</h3>
      <p class="text-sm">Qty: {{ product.quantity }}</p>
      <p>Subtotal: {{ formatPrice(subTotal) }}</p>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'OrderResultCartItem',
  props: {
    product: {
      type: Object,
    },
  },
  mixins: [global],
  computed: {
    subTotal() {
      if (this.product.discountedPrice > 0) {
        return this.product.discountedPrice * this.product.quantity
      } else {
        return this.product.price * this.product.quantity
      }
    },
  },
}
</script>
