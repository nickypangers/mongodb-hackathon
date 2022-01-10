<template>
  <div>
    <h3>Search Your Order</h3>
    <div class="flex items-center my-3">
      <input
        type="text"
        class="flex-grow p-2 rounded-xl"
        placeholder="Enter order number"
        v-model="query"
      />
      <button class="p-2" @click="searchOrder">
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
    </div>
    <div class="grid grid-cols-1 gap-3">
      <order-result v-for="order in orders" :order="order" :key="order.id" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'OrderPage',
  data() {
    return {
      query: '',
      orders: [],
    }
  },
  methods: {
    searchOrder: async function () {
      this.orders = []
      const response = await this.$axios.post('/orders/search', {
        query: this.query,
      })
      const data = response.data
      if (!data.success) {
        return
      }
      this.orders = data.data
    },
  },
}
</script>
