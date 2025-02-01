<script setup>
import { ref, computed } from 'vue'
import useBikeStore from '@/stores/bikesData'
import useRentalStore from '@/stores/rentalData'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
const toast = useToast()

const visible = ref(false) //Bike modal visibility

const showSuccessToast = (message) => {
  toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 })
}

const showErrorToast = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

let bikeStore = useBikeStore()
let rentalStore = useRentalStore()

const typeOptions = ['automatic', 'semi-auto', 'manual']
const statusOptions = ['available', 'rented']
const brandOptions = computed(() => {
  return bikeStore.brands.map((brand) => ({ label: brand.name, value: brand.brand_id }))
})

const newBike = ref({
  bike_name: '',
  brand: '',
  type: '',
  status: '',
  description: '',
  overview: '',
  price_by_day: null,
  max_engine: null,
  gas_capacity: null,
  image: null
})

//Add new bike
const addBike = async () => {
  const formData = new FormData()

  // Convert brand ID to brand name before adding to formData
  const selectedBrand = bikeStore.brands.find((b) => b.brand_id === newBike.value.brand)
  const brandName = selectedBrand ? selectedBrand.name : ''

  for (const key in newBike.value) {
    formData.append(key, key === 'brand' ? brandName : newBike.value[key])
  }

  console.log('Form data before sending:', Object.fromEntries(formData))
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`)
  }

  try {
    await bikeStore.addBike(formData)
    visible.value = false
    newBike.value = {
      /* reset fields */
    }
    showSuccessToast('Bike added successfully')
    bikeStore.fetchBikes()
  } catch (error) {
    showErrorToast('Failed to add bike: ' + (error.response?.data?.message || 'Unknown error'))
    console.error(error)
  }
}

//Delete bike
const deleteBike = async (bikeId) => {
  try {
    if (!confirm('Are you sure you want to delete this bike?')) {
      return
    }
    await bikeStore.deleteBike(bikeId)
    showSuccessToast('Bike deleted successfully')
    rentalStore.fetchRentals()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete bike: ' + (error.response?.data?.message || 'Unknown error'))
  }
}

const updateBike = async (bikeId) => {
  const bike = bikeStore.bikes.find((b) => b.id === bikeId)

  if (!bike) {
    showErrorToast('Bike not found')
    return
  }

  const formData = new FormData()

  const selectedBrand = bikeStore.brands.find((b) => b.brand_id === bike.brand_id)
  const brandName = selectedBrand ? selectedBrand.name : ''

  // Append bike properties to FormData
  formData.append('bike_name', bike.bike_name)
  formData.append('brand', brandName)
  formData.append('type', bike.type)
  formData.append('status', bike.status)
  formData.append('description', bike.description)
  formData.append('overview', bike.overview)
  formData.append('price_by_day', bike.price_by_day)
  formData.append('max_engine', bike.max_engine)
  formData.append('gas_capacity', bike.gas_capacity)

  // Check if there's a new image selected
  if (bike.newImage) {
    formData.append('image', bike.newImage) // Append the new image if it's selected
  }

  try {
    await bikeStore.updateBike(bikeId, formData)
    await bikeStore.fetchBikes()
    await rentalStore.fetchRentals()
    showSuccessToast('Bike updated successfully')
  } catch (error) {
    console.error('Update error:', error.response?.data || error.message)
    showErrorToast('Failed to update bike: ' + (error.response?.data?.message || 'Unknown error'))
  }
}

// Updated onImageChange method to handle specific bike object
const onImageChange = (event, bike = null) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      // 5 MB file size limit
      alert('File is too large. Please select a file smaller than 5 MB.')
      return
    }

    // Set the file to bike or newBike depending on context
    if (bike) {
      bike.newImage = file // For updating bike
    } else {
      newBike.value.image = file // For adding new bike
    }

    // Preview the selected image
    const reader = new FileReader()
    reader.onload = (e) => {
      if (bike) {
        bike.previewImage = e.target.result
      } else {
        newBike.value.previewImage = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
}

// Triggers file input for specific bike ID
const triggerFileUpload = (bikeId = null) => {
  const imageInput = bikeId
    ? document.getElementById(`image-input-${bikeId}`)
    : document.getElementById('image-input-add')
  if (imageInput) {
    imageInput.click()
  }
}

// Method to get the image URL, prioritizing the preview
const getImageUrl = (bike) => {
  return bike.previewImage || `${bike.image}`
}
</script>

<template>
  <Toast />
  <div class="flex justify-between">
    <h1 class="text-3xl font-bold">Bikes</h1>
    <!-- Add Bike Modal -->
    <Button class="mb-4" label="Add new bike " @click="visible = true" />
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      header="Add a new bike"
      :style="{ width: '25rem' }"
    >
      <form @submit.prevent="addBike">
        <div class="flex items-center gap-4 mb-4">
          <label for="bike_name" class="w-24 font-semibold">Name</label>
          <InputText required v-model="newBike.bike_name" id="bike_name" class="flex-auto" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="brand" class="w-24 font-semibold">Brand</label>
          <select
            required
            v-model="newBike.brand"
            class="w-full p-1 border rounded border-[#94a3b8] border-solid"
          >
            <option
              v-for="brandOption in brandOptions"
              :key="brandOption.value"
              :value="brandOption.value"
            >
              {{ brandOption.label }}
              <!-- This will display the brand name -->
            </option>
          </select>
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="type" class="w-24 font-semibold">Type</label>
          <select
            required
            v-model="newBike.type"
            class="w-full p-1 border rounded border-[#94a3b8] border-solid"
          >
            <option v-for="typeOption in typeOptions" :key="typeOption" :value="typeOption">
              {{ typeOption }}
            </option>
          </select>
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="status" class="w-24 font-semibold">Status</label>
          <select
            required
            v-model="newBike.status"
            class="w-full p-1 border rounded border-[#94a3b8] border-solid"
          >
            <option v-for="statusOption in statusOptions" :key="statusOption" :value="statusOption">
              {{ statusOption }}
            </option>
          </select>
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="description" class="w-24 font-semibold">Description</label>
          <textarea
            required
            v-model="newBike.description"
            id="description"
            class="flex-auto border-[#94a3b8] border-solid border rounded"
          ></textarea>
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="overview" class="w-24 font-semibold">Overview</label>
          <textarea
            required
            v-model="newBike.overview"
            id="overview"
            class="flex-auto border-[#94a3b8] border-solid border rounded"
          ></textarea>
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="price" class="w-24 font-semibold">Price</label>
          <InputNumber required v-model="newBike.price_by_day" id="price" class="flex-auto" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="engine" class="w-24 font-semibold">Engine</label>
          <InputNumber required v-model="newBike.max_engine" id="engine" class="flex-auto" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="gas" class="w-24 font-semibold">Gas </label>
          <InputNumber required v-model="newBike.gas_capacity" id="gas" class="flex-auto" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="image" class="w-24 font-semibold">Image </label>
          <input type="file" name="image" @change="onImageChange" class="flex-auto" />
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
  <div class="w-full max-w-screen-xl mx-auto overflow-x-auto">
    <DataTable :value="bikeStore.bikes" :paginator="true" :rows="7">
      <Column sortable field="id" header="ID"></Column>
      <Column sortable field="bike_name" header="Name">
        <template #body="slotProps">
          <input
            v-model="slotProps.data.bike_name"
            type="text"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          />
        </template>
      </Column>
      <Column sortable field="brand_id" header="Brand">
        <template #body="slotProps">
          <select
            v-model="slotProps.data.brand_id"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          >
            <option
              v-for="brandOption in brandOptions"
              :key="brandOption.value"
              :value="brandOption.value"
            >
              {{ brandOption.label }}
            </option>
          </select>
        </template>
      </Column>
      <Column sortable field="type" header="Type">
        <template #body="slotProps">
          <select
            v-model="slotProps.data.type"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          >
            <option v-for="typeOption in typeOptions" :key="typeOption" :value="typeOption">
              {{ typeOption }}
            </option>
          </select>
        </template>
      </Column>
      <Column sortable field="price_by_day" header="Price">
        <template #body="slotProps">
          <input
            v-model="slotProps.data.price_by_day"
            type="number"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          />
        </template>
      </Column>
      <Column sortable field="status" header="Status">
        <template #body="slotProps">
          <select
            v-model="slotProps.data.status"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          >
            <option v-for="statusOption in statusOptions" :key="statusOption" :value="statusOption">
              {{ statusOption }}
            </option>
          </select>
        </template>
      </Column>
      <Column field="image" header="Image">
        <template #body="slotProps">
          <img
            :src="getImageUrl(slotProps.data)"
            class="object-containcursor-pointer"
            @click="triggerFileUpload(slotProps.data.id)"
          />
          <input
            type="file"
            @change="onImageChange($event, slotProps.data)"
            :id="`image-input-${slotProps.data.id}`"
            class="hidden"
          />
        </template>
      </Column>
      <Column sortable field="max_engine" header="Engine">
        <template #body="slotProps">
          <input
            v-model="slotProps.data.max_engine"
            type="number"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          />
        </template>
      </Column>
      <Column sortable field="gas_capacity" header="Gas Capacity">
        <template #body="slotProps">
          <input
            v-model="slotProps.data.gas_capacity"
            type="number"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          />
        </template>
      </Column>

      <Column sortable field="overview" header="Overview">
        <template #body="slotProps">
          <textarea
            v-model="slotProps.data.overview"
            type="text"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          ></textarea>
        </template>
      </Column>

      <Column sortable field="description" header="Description">
        <template #body="slotProps">
          <textarea
            v-model="slotProps.data.description"
            type="text"
            class="p-2 border rounded border-[#94a3b8] border-solid"
          ></textarea>
        </template>
      </Column>

      <Column>
        <template #body="slotProps">
          <button
            @click="updateBike(slotProps.data.id)"
            class="px-2 py-1 text-white bg-blue-500 rounded"
          >
            Update
          </button>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <button
            @click="deleteBike(slotProps.data.id)"
            class="px-2 py-1 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
