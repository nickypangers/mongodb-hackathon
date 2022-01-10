<template>
  <div class="h-full flex justify-center items-center">
    <div class="text-center">
      <h1>Checkout Success</h1>
      <p class="text-lg">
        Your Order ID is {{ orderId }}. You can check your order
        <span>
          <nuxt-link to="/order" class="underline">here</nuxt-link>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckoutSuccessPage',
  computed: {
    orderId() {
      return this.$route.params.id
    },
  },
}
</script>
<style lang="scss" scoped>
h1 {
  @apply text-3xl font-bold;
}
</style>
