export default {
  methods: {
    formatPrice(price) {
      return `HKD$${price.toFixed(2)}`
    },
    addToCart(product) {
      this.$store.dispatch('cart/addItemToCart', product)
    },
    getCategoryColor(category) {
      switch (category.toLowerCase()) {
        case 'shoes':
          return 'bg-blue-300'
        case 'shirt':
          return 'bg-green-300'
        case 'shorts':
          return 'bg-red-300'
        default:
          return 'bg-gray-300'
      }
    },
  },
}
