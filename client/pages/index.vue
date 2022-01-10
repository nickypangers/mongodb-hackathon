<template>
  <div>
    <product-category title="Featured Shirts" category="Shirt" />
    <product-category title="Featured Shoes" category="Shoes" />
    <div class="text-center mt-4">
      <nuxt-link to="/search">
        <button class="bg-green-500 p-2 rounded-lg text-white">
          See Catalog
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    await store.dispatch('products/fetchProducts')
  },
  computed: {
    products() {
      return this.$store.state.products.products
    },
  },
}
</script>
