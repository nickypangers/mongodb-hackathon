export const state = () => ({
  items: [],
  showSidebar: false,
})

export const getters = {
  itemCount(state) {
    let count = 0
    state.items.forEach((item) => {
      count += item.quantity
    })
    return count
  },
  quantityList(state) {
    return state.items.map((item) => item.quantity)
  },
  showSidebar(state) {
    return state.showSidebar
  },
  cartTotal(state) {
    let price = 0
    state.items.forEach((item) => {
      if (item.discountedPrice > 0) {
        price += item.quantity * item.discountedPrice
      } else {
        price += item.quantity * item.price
      }
    })
    return price
  },
}

export const mutations = {
  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item._id === id)
    cartItem.quantity++
  },
  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item._id === id)
    cartItem.quantity--
    if (cartItem.quantity === 0) {
      state.items.splice(state.items.indexOf(cartItem), 1)
    }
  },
  pushItemToCart(state, product) {
    const { discountedPrice, price, name, category } = product
    state.items.push({
      _id: product._id,
      quantity: 1,
      discountedPrice,
      price,
      name,
      category,
    })
  },
  removeItemFromCart(state, item) {
    state.items.splice(state.items.indexOf(item), 1)
  },
  setShowSidebar(state, value) {
    state.showSidebar = value
  },
  setItems(state, items) {
    state.items = items
  },
}

export const actions = {
  addItemToCart({ state, commit }, product) {
    const cartItem = state.items.find((item) => item._id === product._id)
    if (!cartItem) {
      commit('pushItemToCart', product)
    } else {
      commit('incrementItemQuantity', { id: product._id })
    }
  },
  toggleSidebar({ commit }) {
    commit('setShowSidebar', !this.getters.showSidebar)
  },
  emptyCart({ commit }) {
    commit('setItems', [])
  },
}
