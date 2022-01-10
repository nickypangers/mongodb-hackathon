<template>
  <div class="flex items-center">
    <button @click="decreaseQuantity">
      <font-awesome-icon :icon="['fas', 'minus']" />
    </button>
    <p>{{ product.quantity }}</p>
    <button @click="increaseQuantity">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
  </div>
</template>
<script>
export default {
  name: 'QuantitySelector',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    increaseQuantity() {
      this.$store.commit('cart/incrementItemQuantity', { id: this.product._id })
    },
    decreaseQuantity() {
      this.$store.commit('cart/decrementItemQuantity', { id: this.product._id })
    },
  },
}
</script>
<style lang="scss" scoped>
button {
  @apply p-3;
}
</style>
