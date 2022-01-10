<template>
  <div class="mb-2">
    <h3>{{ title }}</h3>
    <div class="grid grid-col-1 md:grid-cols-3 gap-2 mt-2">
      <product-teaser
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductCategory',
  props: {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  computed: {
    products() {
      const list = this.$store.state.products.products.filter(
        (product) => product.category == this.category
      )
      return list.slice(0, 6)
    },
  },
  mounted() {},
}
</script>
