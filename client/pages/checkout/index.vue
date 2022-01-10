<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
    <div class="md:col-span-3 order-2 md:order-1 p-3">
      <nuxt-link to="/cart">Edit Cart</nuxt-link>
      <p class="font-bold text-lg">Checkout</p>
      <div v-if="errors.length > 0">
        <p>Please fix the following errors:</p>
        <ul>
          <li v-for="(error, index) in errors" :key="`error-${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="createOrder">
        <label for="customer_name"> Name: </label>
        <input
          type="text"
          id="customer_name"
          name="customer_name"
          v-model="customer_name"
        />
        <div>
          <label for="customer_email"> Email: </label>
          <input
            type="text"
            id="customer_email"
            name="customer_email"
            v-model="customer_email"
          />
        </div>
        <input type="submit" value="Buy Now" />
      </form>
    </div>
    <div class="order-1 md:order-2">
      <checkout-side-bar />
    </div>
  </div>
</template>
<script>
import global from '~/mixins/global'
export default {
  name: 'CheckoutIndexPage',
  mixins: [global],
  data() {
    return {
      customer_name: '',
      customer_email: '',
      errors: [],
    }
  },
  computed: {
    items() {
      return this.$store.state.cart.items
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
  },
  methods: {
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    createOrder: async function () {
      this.errors = []

      if (!this.customer_name) {
        this.errors.push('Name is required')
      }

      if (!this.customer_email) {
        this.errors.push('Email is required')
      }

      if (this.customer_email && !this.validEmail(this.customer_email)) {
        this.errors.push('Email is invalid')
      }

      if (this.errors.length > 0) {
        return
      }

      const order = {
        customer_name: this.customer_name,
        customer_email: this.customer_email,
        cart: this.items,
        total_price: this.cartTotal,
      }
      const response = await this.$axios.post('/orders/create', order)

      const data = response.data
      if (!data.success) {
        this.errors.push(data.message)
        return
      }

      this.$store.dispatch('cart/emptyCart')
      this.$router.push(`/checkout/success/${data.data._id}`)

      console.log(response)
    },
  },
}
</script>
<style lang="scss" scoped>
label,
input {
  @apply block;
}

label {
  @apply mb-1;
}

input {
  @apply mb-3 p-2 w-full md:w-2/4;
}

a {
  @apply underline;
}
</style>
