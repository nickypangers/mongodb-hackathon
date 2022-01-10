export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({})

  // Set baseURL to something different
  api.setBaseURL(process.env.baseUrl)

  // Inject to context as $api
  inject('api', api)
}
