export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    store.commit('cart/setShowSidebar', false)
    next()
  })
}
