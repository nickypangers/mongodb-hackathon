<template>
  <div class="md:flex justify-between py-3">
    <nuxt-link :to="`/product/${product._id}`">
      <div class="flex pb-1 md:pb-0 text-left">
        <div class="w-28">
          <img :src="getProductImage(product.category)" alt="product" />
        </div>
        <div class="ml-3">
          <p class="text-xl">{{ product.name }}</p>
          <p v-if="!hasDiscount">{{ formatPrice(product.price) }}</p>
          <p v-if="hasDiscount">
            <span>{{ formatPrice(product.discountedPrice) }}</span
            >&nbsp;<span class="line-through text-sm">{{
              formatPrice(product.price)
            }}</span>
          </p>
        </div>
      </div>
    </nuxt-link>
    <div class="md:flex items-center">
      <quantity-selector :product="product" />
      <p class="md:ml-4">{{ formatPrice(subTotal) }}</p>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CheckoutItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  mixins: [global],
  computed: {
    hasDiscount() {
      return this.product.discountedPrice > 0
    },
    subTotal() {
      if (this.product.discountedPrice > 0) {
        return this.product.discountedPrice * this.product.quantity
      }
      return this.product.price * this.product.quantity
    },
  },
}
</script>
