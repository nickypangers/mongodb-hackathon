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
    </div>
    <div v-if="isLoading" class="text-center">
      <p>Loading</p>
    </div>
    <div v-if="!isLoading">
      <div v-if="!hasOrder" class="text-center">
        <p>Cannot find order with order ID: {{ query }}</p>
      </div>
      <div class="grid grid-cols-1 gap-3" v-if="hasOrder">
        <order-result v-for="order in orders" :order="order" :key="order.id" />
      </div>
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
      isLoading: false,
    }
  },
  computed: {
    hasOrder() {
      if (this.query.length === 24 && this.orders.length === 0) {
        return false
      }
      return true
    },
  },
  watch: {
    query(val) {
      if (val.length < 24) {
        this.orders = []
        return
      }
      this.searchOrder()
    },
  },
  methods: {
    searchOrder: async function () {
      this.orders = []
      this.isLoading = true
      const response = await this.$axios.post('/orders/search', {
        query: this.query,
      })
      const data = response.data
      if (!data.success) {
        console.log(data.message)
        this.isLoading = false
        return
      }
      this.orders = data.data
      this.isLoading = false
    },
  },
}
</script>
