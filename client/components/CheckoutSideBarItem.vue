<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <div class="w-16">
        <img :src="getProductImage(product.category)" alt="product" />
      </div>
      <div class="ml-3">
        <p>{{ product.name }}</p>
        <p>Qty: {{ product.quantity }}</p>
      </div>
    </div>
    <div>
      <!-- <quantity-selector :product="product" /> -->
      <p>{{ formatPrice(subTotal) }}</p>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CheckoutSideBarItem',
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
      }
      return this.product.quantity * this.product.price
    },
  },
}
</script>
