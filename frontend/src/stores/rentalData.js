import { defineStore } from 'pinia'
import axios from 'axios'

const useRentalStore = defineStore('rentalData', {
  state: () => ({
    rentals: [],
    rental: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchRentals() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/api/rentals')
        this.rentals = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load rentals'
      } finally {
        this.isLoading = false
      }
    },
    async addRental({
      user_id,
      bike_id,
      rental_start,
      rental_end,
      city,
      quantity,
      user_name,
      phone_number,
      email,
      bike_name,
      message,
      total_price
    }) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/api/rental', {
          user_id,
          bike_id,
          rental_start,
          rental_end,
          city,
          quantity,
          user_name,
          phone_number,
          email,
          bike_name,
          message,
          total_price
        })
        this.rental = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to add rental'
      } finally {
        this.isLoading = false
      }
    },

    async deleteRental(id) {
      this.isLoading = true
      this.error = null
      try {
        await axios.delete(`/api/rental/${id}`)
        this.fetchRentals()
      } catch (error) {
        console.error(error)
        this.error = 'Failed to delete rental'
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useRentalStore
