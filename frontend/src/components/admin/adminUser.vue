<script setup>
import useUserStore from '@/stores/userData'
import useRentalStore from '@/stores/rentalData'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const toast = useToast()

const showSuccessToast = (message) => {
  toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 })
}

const showErrorToast = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

let userStore = useUserStore()
let rentalStore = useRentalStore()

//Delete user
const deleteUser = async (userId) => {
  try {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }
    showSuccessToast('User deleted successfully')
    await userStore.deleteUser(userId)
    rentalStore.fetchRentals()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete user: ' + (error.response?.data?.message || 'Unknown error'))
  }
}
</script>

<template>
  <Toast />
  <h1 class="pb-4 text-3xl font-bold">Users</h1>
  <DataTable :value="userStore.users" :paginator="true" :rows="10">
    <Column sortable field="id" header="ID"></Column>
    <Column sortable field="username" header="Name"></Column>
    <Column sortable field="role" header="Role"></Column>
    <Column>
      <template #body="slotProps">
        <button
          @click="deleteUser(slotProps.data.id)"
          class="px-2 py-1 text-white bg-red-500 rounded"
        >
          Delete
        </button>
      </template>
    </Column>
  </DataTable>
</template>
