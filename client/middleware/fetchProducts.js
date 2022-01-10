export default async function ({ store }) {
  let products = store.state.products.products
  if (products.length === 0) {
    await store.dispatch('products/fetchProducts')
  }
}
