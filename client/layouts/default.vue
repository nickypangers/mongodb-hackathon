<template>
  <div class="h-screen flex flex-col">
    <nav-bar />
    <div class="container flex-grow">
      <nuxt />
      <cart-side-bar />
    </div>
    <Footer />
  </div>
</template>
<script>
export default {
  middleware: 'fetchProducts',
}
</script>
