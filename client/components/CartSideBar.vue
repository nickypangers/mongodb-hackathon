<template>
  <div
    ref="cartSidebar"
    id="cartSidebar"
    class="fixed top-0 bottom-0 right-0 rounded-tl-lg rounded-bl-lg border z-10 bg-gray-200 overflow-x-hidden"
  >
    <div class="w-full h-full relative">
      <div
        ref="cartHeader"
        class="sticky top-0 inset-x-0 flex justify-between items-center p-3 bg-secondary text-white"
      >
        <button @click="closeCartSidebar">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <p class="font-bold">Your Cart</p>
      </div>
      <div ref="cartContent" class="overflow-y-scroll divide-y">
        <cart-product-row
          v-for="(item, index) in items"
          :key="item._id + `_${index}`"
          :product="item"
          @update="updateCartTotal"
        />
      </div>
      <div
        ref="cartFooter"
        class="sticky bottom-0 inset-x-0 p-3 bg-secondary text-white flex justify-between items-center"
      >
        <p class="font-bold">Total: {{ formatPrice(cartTotal) }}</p>
        <nuxt-link to="/cart">
          <button class="bg-blue-300 p-2 rounded-lg">View Cart</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CartSideBar',
  mixins: [global],
  data() {
    return {
      sidebarWidth: '33%',
    }
  },
  computed: {
    items() {
      return this.$store.state.cart.items
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
    showSidebar() {
      return this.$store.getters['cart/showSidebar']
    },
    quantityList() {
      return this.$store.getters['cart/quantityList']
    },
  },
  watch: {
    showSidebar(val) {
      if (val) {
        this.$refs.cartSidebar.style.width = this.sidebarWidth
      } else {
        this.$refs.cartSidebar.style.width = '0'
      }
    },
    'window.innerHeight': function (val) {
      console.debug('watch', val)
    },
  },
  created() {},
  mounted() {
    this.defineSidebarWidth()
    this.setCartContentHeight()

    window.addEventListener(
      'resize',
      () => {
        this.defineSidebarWidth()

        const width = window.innerWidth
        if (this.showSidebar === true) {
          if (width > 768) {
            this.$refs.cartSidebar.style.width = '33%'
          } else {
            this.$refs.cartSidebar.style.width = '100%'
          }
        }

        this.setCartContentHeight()
      },
      this
    )
  },
  methods: {
    defineSidebarWidth() {
      if (window.innerWidth > 768) {
        this.sidebarWidth = '33%'
      } else {
        this.sidebarWidth = '100%'
      }
    },
    setCartContentHeight() {
      const cartHeaderHeight = 48
      const cartFooterHeight = 64
      const cartContentHeight =
        window.innerHeight - cartHeaderHeight - cartFooterHeight
      this.$refs.cartContent.style.height = `${cartContentHeight}px`
    },
    closeCartSidebar() {
      this.$store.commit('cart/setShowSidebar', false)
    },
    updateCartTotal() {
      this.$store.dispatch('cart/getTotalPrice')
    },
  },
}
</script>
<style lang="scss" scoped>
#cartSidebar {
  transition: 0.5s;
  width: 0;
}
</style>
