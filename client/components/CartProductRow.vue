<template>
  <div class="flex justify-between items-center p-3">
    <div class="flex items-center">
      <div class="w-24">
        <img :src="getProductImage(product.category)" alt="product" />
      </div>
      <div class="ml-3">
        <p>{{ product.name }}</p>
        <p>{{ formatPrice(subTotal) }}</p>
      </div>
    </div>
    <div>
      <quantity-selector :product="product" />
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CartProductRow',
  props: {
    product: {
      type: Object,
      required: true,
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
