<template>
  <div class="mt-4 border-t">
    <div class="container py-4">
      <div class="flex justify-between">
        <div class="section">
          <p>Pages</p>
          <nuxt-link to="/">Home</nuxt-link>
          <nuxt-link to="/search">Catalog</nuxt-link>
          <nuxt-link to="/cart">Cart</nuxt-link>
        </div>
        <div class="section">
          <p>Orders</p>
          <nuxt-link to="/order">Search Your Order</nuxt-link>
        </div>
        <div class="section">
          <p>Links</p>
          <a href="https://nickypangers.com">Portfolio</a>
          <a href="https://github.com/nickypangers">Github Profile</a>
          <a href="https://nickypangers.com">Github Repository</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style lang="scss" scoped>
.section {
  @apply font-bold;

  a {
    @apply underline font-normal block;
  }
}
</style>
