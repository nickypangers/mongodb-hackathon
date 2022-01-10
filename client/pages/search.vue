<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div>
        <div class="h-auto bg-white p-3 rounded-lg shadow-lg">
          <p class="font-semibold text-lg">
            <span><font-awesome-icon :icon="['fas', 'filter']" /></span>
            Refine your search
          </p>
          <div>
            <input
              type="text"
              v-model="query.name"
              placeholder="Search product name"
            />
          </div>

          <div class="mt-2">
            <label for="gt"
              >Min Price
              <input
                type="number"
                name="gt"
                id="gt"
                v-model.number="query.price.gt"
              />
            </label>
            <label for="lte"
              >Max Price
              <input
                type="number"
                name="lte"
                id="lte"
                v-model.number="query.price.lte"
              />
            </label>
          </div>
          <div class="mt-2">
            <label for="discount_only" class="w-min">Discount Only:</label>
            <input
              type="checkbox"
              name="discount_only"
              id="discount_only"
              v-model="query.discount_only"
            />
          </div>
          <div class="mt-2">
            <label for="category" class="w-min">Category:</label>
            <select name="cateogry" id="category" v-model="query.category">
              <option value="">All</option>
              <option
                v-for="category in categoryList"
                :value="category"
                :key="`category-${category}`"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="md:col-span-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <template v-if="isLoading">Loading</template>
          <template v-if="!isLoading">
            <product-teaser
              :product="product"
              v-for="product in productList"
              :key="product._id"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchPage',
  head() {
    return {
      title: 'Search - MongoDB Ecommerce',
    }
  },
  async asyncData({ $axios }) {
    const response = await $axios.$get('/products/categories')
    if (!response.success) {
      console.log(data.message)
      return {
        categoryList: [],
      }
    }
    return {
      categoryList: response.data,
    }
  },
  data() {
    return {
      query: {
        name: '',
        price: {
          gt: 0,
          lte: 0,
        },
        discount_only: false,
        category: '',
      },
      results: [],
      timer: null,
      isLoading: false,
    }
  },
  computed: {
    hasQuery() {
      if (
        !this.query.name &&
        this.query.price.gt === 0 &&
        this.query.price.lte === 0 &&
        !this.query.discount_only &&
        this.query.category === ''
      ) {
        return false
      }
      return true
    },
    productList() {
      if (!this.hasQuery) {
        return this.$store.state.products.products
      }
      return this.results
    },
  },
  watch: {
    'query.price.lte': function (val) {
      if (val < 0 || val === '') {
        this.query.price.lte = 0
      }
    },
    'query.price.gt': function (val) {
      if (val < 0 || val === '') {
        this.query.price.gt = 0
      }
    },
    query: {
      handler: function (val) {
        clearTimeout(this.timer)
        if (!this.hasQuery) {
          return
        }
        const vue = this
        this.isLoading = true
        this.timer = setTimeout(async () => {
          await vue.getRefineProductList(val)
        }, 500)
        vue.isLoading = false
      },
      deep: true,
    },
  },
  methods: {
    getRefineProductList: async function (val) {
      const response = await this.$axios.post('/products/search/refine', val)
      const data = response.data
      if (!data.success) {
        console.log(data.message)
        return
      }
      this.results = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
label {
  @apply block w-full;
}

input[type='text'],
input[type='number'] {
  @apply border p-1.5 rounded-lg w-full;
}

select {
  @apply p-1.5 rounded-lg w-full bg-white border;
}
</style>
