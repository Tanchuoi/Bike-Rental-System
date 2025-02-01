import { defineStore } from 'pinia'
import axios from 'axios'

const useBikesStore = defineStore('bikes', {
  state: () => ({
    bikes: [],
    bike: null, // Initially set to null, indicating no bike is selected
    brands: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchBikes() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/api/bikes')
        this.bikes = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load bikes' // Set a user-friendly error message
      } finally {
        this.isLoading = false
      }
    },
    async fetchBikeById(id) {
      this.bike = null // Clear the previous bike data
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(`/api/bike/${id}`)
        this.bike = response.data // Set the bike data in the store
      } catch (error) {
        console.error(error)
        this.error = `Failed to load bike with id ${id}`
      } finally {
        this.isLoading = false
      }
    },
    async fetchFilteredBikes({ type = '', brand = '', sortField = '', sortDirection = '' }) {
      this.isLoading = true
      this.error = null
      try {
        // Construct query string
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (brand) params.append('brand', brand)
        if (sortField) params.append('sortField', sortField)
        if (sortDirection) params.append('sortDirection', sortDirection)

        const response = await axios.get(`/api/bikes/filter?${params.toString()}`)
        this.bikes = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load filtered bikes'
      } finally {
        this.isLoading = false
      }
    },

    async deleteBike(id) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`/api/bike/${id}`)
        this.bikes = this.bikes.filter((bike) => bike.id !== id)
      } catch (error) {
        console.error(error)
        this.error = 'Failed to delete bike'
      } finally {
        this.isLoading = false
      }
    },

    async addBike(bikeData) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/api/bike', bikeData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Important for file upload
          }
        })
        return response.data // Return the new bike data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to add bike'
        throw error // Re-throw the error
      } finally {
        this.isLoading = false
      }
    },

    async updateBike(id, bikeData) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.put(`/api/bike/${id}`, bikeData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data // Return the updated bike data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to update bike'
        throw error // Re-throw the error
      } finally {
        this.isLoading = false
      }
    },

    async fetchBikeBrands() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/api/brands')
        this.brands = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load bike brands'
      } finally {
        this.isLoading = false
      }
    },

    async addBikeBrand(brand) {
      this.isLoading = true
      this.error = null
      try {
        await axios.post('/api/brand', { brand })
      } catch (error) {
        console.error(error)
        this.error = 'Failed to add bike brand'
      } finally {
        this.isLoading = false
      }
    },

    async deleteBikeBrand(id) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`/api/brand/${id}`)
        this.brands = this.brands.filter((brand) => brand.id !== id)
      } catch (error) {
        console.error(error)
        this.error = 'Failed to delete bike brand'
      } finally {
        this.isLoading = false
      }
    }
  }
})
export default useBikesStore
