import { defineStore } from 'pinia'
import axios from '@/axios'

const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null, // Load from localStorage
    isLoading: false,
    error: null,
    users: []
  }),
  actions: {
    async login({ username, password }) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/api/login', { username, password })
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data)) // Save to localStorage
      } catch (error) {
        console.error(error)
        this.error = 'Invalid credentials'
      } finally {
        this.isLoading = false
      }
    },

    async register({ username, password }) {
      this.isLoading = true
      this.error = null
      try {
        await axios.post('/api/register', { username, password })
        this.user = { username }
      } catch (error) {
        console.error(error)
        this.error = 'Username already exists'
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user') // Clear from localStorage
    },

    async getUsers() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/api/users')
        this.users = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Error fetching users'
      } finally {
        this.isLoading = false
      }
    },

    async deleteUser(id) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`/api/user/${id}`)
        this.users = this.users.filter((user) => user.id !== id)
      } catch (error) {
        console.error(error)
        this.error = 'Error deleting user'
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useUserStore
