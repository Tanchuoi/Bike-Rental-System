<script setup>
import useRentalStore from '@/stores/rentalData'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
const toast = useToast()
const showSuccessToast = (message) => {
  toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 })
}
const showErrorToast = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

let rentalStore = useRentalStore()

//Delete rental
const deleteRental = async (rentalId) => {
  try {
    if (!confirm('Are you sure you want to delete this rental?')) {
      return
    }
    await rentalStore.deleteRental(rentalId)
    showSuccessToast('Rental deleted successfully')
    rentalStore.fetchRentals()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete rental: ' + (error.response?.data?.message || 'Unknown error'))
  }
}
</script>

<template>
  <Toast />
  <h1 class="mb-4 text-3xl font-bold">Rentals</h1>
  <div class="overflow-auto border rounded-lg">
    <DataTable :value="rentalStore.rentals" :paginator="true" :rows="10">
      <Column sortable field="id" header="ID"></Column>
      <Column sortable field="user_name" header="User Name"></Column>
      <Column sortable field="phone_number" header="Phone"></Column>
      <Column sortable field="email" header="Email"></Column>
      <Column sortable field="bike_name" header="Bike Name"></Column>
      <Column sortable field="rental_start" header="Start Date"></Column>
      <Column sortable field="rental_end" header="End Date"></Column>
      <Column sortable field="city" header="City"></Column>
      <Column sortable field="quantity" header="Quantity"></Column>
      <Column sortable field="total_price" header="Total Price"></Column>
      <Column sortable field="message" header="Message"></Column>
      <Column>
        <template #body="slotProps">
          <button
            @click="deleteRental(slotProps.data.id)"
            class="px-2 py-1 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
