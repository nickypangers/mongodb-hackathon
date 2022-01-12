<template>
  <div>
    <h2 class="mb-4">Your Cart</h2>
    <div v-if="items.length === 0" class="py-6">
      <p class="mb-4">Your cart is empty.</p>
      <nuxt-link to="/">
        <button class="hover:bg-blue-300 rounded-lg p-2 text-white bg-blue-500">
          Continue Shopping
        </button>
      </nuxt-link>
    </div>
    <div class="divide-y" v-if="items.length > 0">
      <checkout-item v-for="item in items" :product="item" :key="item._id" />
    </div>
    <div class="border-t pt-4">
      <div>
        <p class="md:text-right font-bold">
          Total: {{ formatPrice(cartTotal) }}
        </p>
      </div>
      <div class="flex md:justify-end mt-3">
        <nuxt-link to="/checkout">
          <button
            class="py-2 px-4 rounded-lg hover:bg-blue-300 bg-blue-500 text-white"
            :disabled="itemCount === 0"
          >
            Checkout
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CartPage',
  mixins: [global],
  head() {
    return {
      title: 'Cart - MongoDB Ecommerce',
    }
  },
  data() {
    return {}
  },
  computed: {
    items() {
      return this.$store.state.cart.items
    },
    itemCount() {
      return this.$store.getters['cart/itemCount']
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
  },
}
</script>
<style lang="scss" scoped>
button {
  &:disabled {
    @apply bg-gray-300 cursor-default;
  }
}
</style>
