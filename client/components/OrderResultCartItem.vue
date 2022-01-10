<template>
  <div class="flex items-center">
    <div class="w-28">
      <img src="/product/image.png" alt="product" />
    </div>
    <div class="ml-3">
      <h3>{{ item.name }}</h3>
      <p class="text-sm">Qty: {{ item.quantity }}</p>
      <p>Subtotal: {{ formatPrice(subTotal) }}</p>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'OrderResultCartItem',
  props: {
    item: {
      type: Object,
    },
  },
  mixins: [global],
  computed: {
    subTotal() {
      if (this.item.discountedPrice > 0) {
        return this.item.discountedPrice * this.item.quantity
      } else {
        return this.item.price * this.item.quantity
      }
    },
  },
}
</script>
