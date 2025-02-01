<script setup>
import { onMounted, ref, computed } from 'vue'
import navbar from '@/components/Navbar.vue'
import hero from '@/components/Hero.vue'
import bikeCard from '@/components/BikeCard.vue'
import FooterForm from '@/components/FooterForm.vue'
import useBikeStore from '@/stores/bikesData.js'
import Paginator from 'primevue/paginator'

let bikesStore = useBikeStore()

const first = ref(0)
const rowsPerPage = ref(4)

const paginatedBikes = computed(() => {
  const start = first.value
  const end = start + rowsPerPage.value
  return bikesStore.bikes.slice(start, end)
})

const onPageChange = (event) => {
  first.value = event.first
}

onMounted(() => {
  bikesStore.fetchBikes()
  bikesStore.fetchBikeBrands()
})

const brands = computed(() => bikesStore.brands)

const selectedSort = ref('')
const selectedTransmission = ref('')
const selectedBrand = ref('')

const resetFilters = () => {
  selectedSort.value = ''
  selectedTransmission.value = ''
  selectedBrand.value = ''
  applyFilters() // Reset the bikes list to the default state
}

const applyFilters = () => {
  let sortType = ''
  let sortDirection = ''

  if (selectedSort.value.includes('Price')) {
    sortType = 'price_by_day'
    sortDirection = selectedSort.value.includes('increase') ? 'asc' : 'desc'
  } else if (selectedSort.value.includes('Engine')) {
    sortType = 'max_engine'
    sortDirection = selectedSort.value.includes('increase') ? 'asc' : 'desc'
  } else if (selectedSort.value.includes('GasCapacity')) {
    sortType = 'gas_capacity'
    sortDirection = selectedSort.value.includes('increase') ? 'asc' : 'desc'
  }

  bikesStore.fetchFilteredBikes({
    type: selectedTransmission.value,
    brand: selectedBrand.value,
    sortField: sortType,
    sortDirection
  })
}
</script>

<template>
  <navbar />
  <hero />
  <body class="px-4 py-12 bg-white">
    <!-- Wrapper Container -->
    <div class="container mx-auto">
      <!-- Sort and Filter Section -->
      <div class="block md:flex md:space-x-6">
        <div class="w-full p-4 mb-6 bg-white md:w-1/3 lg:w-1/4 md:mb-0">
          <div class="mb-4">
            <label for="sort" class="block text-sm font-medium text-gray-700">Sort</label>
            <select
              @change="applyFilters"
              v-model="selectedSort"
              id="sort"
              class="block w-full p-2 mt-1 rounded-md bg-gray-50"
            >
              <option disabled value="">Sort bikes...</option>
              <option value="increasePrice">Price (low to high)</option>
              <option value="decreasePrice">Price (high to low)</option>
              <option value="increaseEngine">Engine (low to high)</option>
              <option value="decreaseEngine">Engine (high to low)</option>
              <option value="increaseGasCapacity">Gas Capacity (low to high)</option>
              <option value="decreaseGasCapacity">Gas Capacity (high to low)</option>
            </select>
          </div>
          <div class="mb-4">
            <p class="mb-2 font-semibold">Transmission</p>
            <div class="flex items-center mb-2">
              <input
                @change="applyFilters"
                v-model="selectedTransmission"
                type="radio"
                id="auto"
                name="transmission"
                value="automatic"
                class="p-2 mr-2"
              />
              <label for="auto" class="text-gray-700">Automatic </label>
            </div>
            <div class="flex items-center mb-2">
              <input
                @change="applyFilters"
                v-model="selectedTransmission"
                type="radio"
                id="manual"
                name="transmission"
                value="manual"
                class="p-2 mr-2"
              />
              <label for="manual" class="text-gray-700">Manual </label>
            </div>
            <div class="flex items-center">
              <input
                @change="applyFilters"
                v-model="selectedTransmission"
                type="radio"
                id="semi-auto"
                name="transmission"
                value="semi-auto"
                class="p-2 mr-2"
              />
              <label for="semi-auto" class="text-gray-700">Semi-Automatic </label>
            </div>
          </div>

          <div>
            <div>
              <p class="mb-2 font-semibold">Brand</p>
              <div v-for="brand in brands" :key="brand.id" class="flex items-center mb-2">
                <input
                  @change="applyFilters"
                  v-model="selectedBrand"
                  type="radio"
                  :id="brand.name"
                  :name="brand.name"
                  :value="brand.name"
                  class="p-2 mr-2"
                />
                <label :for="brand.name" class="text-gray-700">{{ brand.name }}</label>
              </div>
            </div>
          </div>
          <div>
            <button @click="resetFilters" class="mt-6 hover:opacity-75">
              <p>Reset</p>
            </button>
          </div>
        </div>

        <!-- Bike Listing Section -->
        <div class="w-full md:w-2/3 lg:w-3/4">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <!-- Bikes -->
            <bikeCard
              v-for="bike in paginatedBikes"
              :key="bike.id"
              :id="bike.id"
              :name="bike.bike_name"
              :brand="bike.brand"
              :description="bike.description"
              :priceByDay="bike.price_by_day"
              :type="bike.type"
              :status="bike.status"
              :image="bike.image"
              :overview="bike.overview"
              :maxEngine="bike.max_engine"
              :gasCapacity="bike.gas_capacity"
            />
          </div>
          <!-- Pagination -->
          <div class="flex items-center justify-center py-16">
            <!-- Pagination Controls -->
            <paginator
              class="custom-paginator"
              :rows="rowsPerPage"
              :total-records="bikesStore.bikes.length"
              :first="first"
              @page="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </body>
  <FooterForm />
</template>
