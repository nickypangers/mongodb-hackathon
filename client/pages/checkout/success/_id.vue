<template>
  <div>
    <p>success</p>
    <p>{{ orderId }}</p>
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
