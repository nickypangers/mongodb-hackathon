<template>
  <div class="grid grid-col-1 md:grid-cols-2 gap-3">
    <div class="py-3">
      <img :src="getProductImage(product.category)" alt="product" />
    </div>
    <div>
      <h2 class="mb-2">{{ product.name }}</h2>
      <h3 v-if="product.discountedPrice === 0" class="mb-2">
        {{ formatPrice(product.price) }}
      </h3>
      <h3 v-if="product.discountedPrice > 0" class="mb-2">
        <span class="font-bold">{{
          formatPrice(product.discountedPrice)
        }}</span>
        <span class="line-through">{{ formatPrice(product.price) }}</span>
      </h3>
      <category-label :category="product.category" />
      <div class="my-2 border p-2 rounded-lg">
        <p class="underline">Description</p>
        <p>{{ product.description }}</p>
      </div>
      <button class="add-to-cart" @click="atcClicked()" :disabled="!hasStock">
        {{ atcText }}
      </button>
    </div>
  </div>
</template>
<script>
import global from '@/mixins/global.js'
import 'vue-toast-notification/dist/theme-sugar.css'
export default {
  name: 'ProductPage',
  mixins: [global],
  async asyncData({ route, $axios }) {
    const id = route.params.id
    const response = await $axios.$get(`products/${id}`)

    return {
      id: route.params.id,
      product: response.data,
    }
  },
  data() {
    return {
      isClicked: false,
      timer: null,
    }
  },
  computed: {
    hasStock() {
      return this.product.stock > 0
    },
    items() {
      return this.$store.state.cart.items
    },
    atcText() {
      return this.isClicked ? 'Added To Cart' : 'Add To Cart'
    },
  },
  methods: {
    atcClicked() {
      clearTimeout(this.timer)
      this.isClicked = true
      this.addToCart(this.product)
      this.timer = setTimeout(() => {
        this.isClicked = false
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
button {
  @apply rounded-lg p-2;

  &:disabled {
    @apply bg-gray-300 cursor-default;
  }
}
</style>
