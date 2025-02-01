import axios from 'axios'

// Set the base URL for your API (optional, based on your setup)
// axios.defaults.baseURL = 'http://localhost:3000/api'; // Adjust based on your server URL

// Add a request interceptor to attach the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
