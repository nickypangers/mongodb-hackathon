<template>
  <button class="w-full p-3" @click="goToProduct">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-12">
          <img src="/product/image.png" alt="product" />
        </div>
        <div class="ml-3 text-left">
          <p class="text-lg">{{ product.name }}</p>
          <category-label :category="product.category" class="mt-2" />
        </div>
      </div>
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </div>
  </button>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'SearchResult',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [global],
  emits: ['go'],
  methods: {
    goToProduct() {
      this.$emit('go', this.product)
    },
  },
}
</script>
