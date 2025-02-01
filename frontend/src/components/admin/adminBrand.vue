<script setup>
import { ref } from 'vue'
import useBikeStore from '@/stores/bikesData'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
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

let bikeStore = useBikeStore()

let newBrand = ref('')

let visible = ref(false)

// Add new brand
const addBikeBrand = async () => {
  try {
    await bikeStore.addBikeBrand(newBrand.value)
    showSuccessToast('Brand added successfully')
    bikeStore.fetchBikeBrands()
    visible.value = false
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to add brand: ' + (error.response?.data?.message || 'Unknown error'))
  }
}

//Delete bike brand
const deleteBikeBrand = async (brandId) => {
  try {
    if (!confirm('Are you sure you want to delete this brand?')) {
      return
    }
    await bikeStore.deleteBikeBrand(brandId)
    showSuccessToast('Brand deleted successfully')
    bikeStore.fetchBikeBrands()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete brand: ' + (error.response?.data?.message || 'Unknown error'))
  }
}
</script>

<template>
  <Toast />
  <div class="flex justify-between">
    <h1 class="text-3xl font-bold">Brands</h1>
    <Button class="mb-4" label="Add new brand " @click="visible = true" />
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      header="Add a new brand"
      :style="{ width: '25rem' }"
    >
      <form @submit.prevent="addBikeBrand">
        <div class="flex items-center gap-4 mb-4">
          <label for="bike_brand" class="w-24 font-semibold">Brand Name</label>
          <InputText required v-model="newBrand" id="bike_brand" class="flex-auto" />
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="submit" label="Add"></Button>
        </div>
      </form>
    </Dialog>
  </div>

  <DataTable :value="bikeStore.brands" :paginator="true" :rows="10">
    <Column sortable field="brand_id" header="ID"></Column>
    <Column sortable field="name" header="Brand Name"></Column>
    <Column>
      <template #body="slotProps">
        <button
          @click="deleteBikeBrand(slotProps.data.brand_id)"
          class="px-2 py-1 text-white bg-red-500 rounded"
        >
          Delete
        </button>
      </template>
    </Column>
  </DataTable>
</template>
