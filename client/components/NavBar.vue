<template>
  <div class="container">
    <div
      class="w-full flex md:flex-row flex-col md:justify-between md:items-center py-3"
    >
      <div class="text-center md:text-left mb-1 md:mb-0">
        <nuxt-link to="/">Home</nuxt-link>
      </div>
      <search-section class="order-2 md:order-1" />
      <div
        class="flex justify-center md:justify-end items-center order-1 md:order-2 mb-1 md:mb-0"
      >
        <nuxt-link to="/search">
          <button class="nav-button mr-1.5">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </nuxt-link>
        <nuxt-link to="/order">
          <button class="nav-button mr-1.5">
            <font-awesome-icon :icon="['fas', 'history']" />
          </button>
        </nuxt-link>
        <button class="nav-button flex items-center" @click="showCartSidebar">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          <p class="ml-2">{{ cartItemCount }}</p>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'NavBar',
  mixins: [global],
  computed: {
    cartItems() {
      return this.$store.state.cart.items
    },
    cartItemCount() {
      return this.$store.getters['cart/itemCount']
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
  },
  methods: {
    showCartSidebar() {
      this.$store.dispatch('cart/toggleSidebar')
    },
  },
}
</script>
s
<style lang="scss" scoped>
.nav-button {
  height: 44px;
  min-width: 44px;
  @apply p-2 border rounded-xl;
}
</style>
