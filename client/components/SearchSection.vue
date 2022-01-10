<template>
  <div>
    <div class="relative w-full md:w-96">
      <input
        type="text"
        class="bg-white p-2 rounded-xl w-full"
        v-model="query"
        placeholder="Search product/category"
      />
      <div
        class="absolute bg-white inset-x-0 divide-y p-3 overflow-y-auto"
        v-show="!isQueryEmpty"
        style="max-height: 880px"
      >
        <search-result
          v-for="result in results"
          :product="result"
          :key="result._id"
          @go="goToProduct"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchSection',
  data() {
    return {
      query: '',
      isFocus: false,
      results: [],
    }
  },
  computed: {
    isQueryEmpty() {
      return this.query.length === 0
    },
  },
  watch: {
    query(val) {
      if (!val) {
        this.results = []
        return
      }
      setTimeout(async () => {
        this.results = await this.getResults()
      }, 500)
    },
  },
  methods: {
    getResults: async function () {
      if (this.isQueryEmpty) {
        return []
      }
      const response = await this.$axios.post('/products/search', {
        name: this.query,
      })

      const data = response.data
      if (!data.success) {
        console.log(data.message)
        return []
      }

      return data.data
    },
    goToProduct(product) {
      this.query = ''
      this.$router.push(`/product/${product._id}`)
    },
  },
}
</script>
