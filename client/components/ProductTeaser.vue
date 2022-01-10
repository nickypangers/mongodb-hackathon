<template>
  <div
    class="w-full border border-2 border-gray-200 rounded-lg p-3 text-left cursor-pointer"
    @click="goToProduct"
  >
    <div>
      <img :src="getProductImage(product.category)" alt="product" />
    </div>
    <div>
      <p class="text-xl truncate">
        {{ product.name }}
      </p>
      <category-label :category="product.category" class="my-2" />
      <div v-if="product.discountedPrice > 0">
        <p class="font-bold">
          {{ formatPrice(product.discountedPrice) }}
        </p>
        <p class="line-through text-xs">
          {{ formatPrice(product.price) }}
        </p>
      </div>
      <div v-if="product.discountedPrice === 0">
        <p>{{ formatPrice(product.price) }}</p>
        <p class="text-xs">&nbsp;</p>
      </div>
      <div v-if="!hasStock" style="height: 40px">Out of Stock</div>
      <button
        v-if="hasStock"
        class="add-to-cart mt-2"
        @click.stop="atcClicked()"
      >
        {{ atcText }}
      </button>
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'ProductTeaser',
  mixins: [global],
  props: {
    product: {
      type: Object,
      required: true,
    },
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
    atcText() {
      return this.isClicked ? 'Added To Cart' : 'Add To Cart'
    },
  },
  methods: {
    goToProduct() {
      this.$router.push(`/product/${this.product._id}`)
    },
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
