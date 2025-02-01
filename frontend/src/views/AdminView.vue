<script setup>
import { onMounted, ref } from 'vue'
import useUserStore from '@/stores/userData'
import useBikeStore from '@/stores/bikesData'
import useRentalStore from '@/stores/rentalData'
import adminUser from '@/components/admin/adminUser.vue'
import adminBike from '@/components/admin/adminBike.vue'
import adminBrand from '@/components/admin/adminBrand.vue'
import adminRental from '@/components/admin/adminRental.vue'

let userStore = useUserStore()
let bikeStore = useBikeStore()
let rentalStore = useRentalStore()

// Change active tab
const activeTab = ref('dashboard')
const setActiveTab = (tab) => {
  activeTab.value = tab
}

onMounted(async () => {
  await userStore.getUsers()
  await bikeStore.fetchBikes()
  await bikeStore.fetchBikeBrands()
  await rentalStore.fetchRentals()
})
</script>

<template>
  <Toast />
  <div class="flex">
    <!-- Sidebar -->
    <aside class="min-h-screen text-white bg-gray-800 min-w-44">
      <div class="p-4 text-2xl font-bold">
        <RouterLink to="/"><i class="fa-solid fa-house-user"></i></RouterLink> Admin
      </div>
      <nav class="mt-4">
        <ul>
          <li>
            <button
              @click="setActiveTab('dashboard')"
              :class="{ 'bg-gray-700': activeTab === 'dashboard' }"
              class="w-full px-4 py-2 text-left"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('users')"
              :class="{ 'bg-gray-700': activeTab === 'users' }"
              class="w-full px-4 py-2 text-left"
            >
              Users
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('bikes')"
              :class="{ 'bg-gray-700': activeTab === 'bikes' }"
              class="w-full px-4 py-2 text-left"
            >
              Bikes
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('brands')"
              :class="{ 'bg-gray-700': activeTab === 'brands' }"
              class="w-full px-4 py-2 text-left"
            >
              Brands
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('rentals')"
              :class="{ 'bg-gray-700': activeTab === 'rentals' }"
              class="w-full px-4 py-2 text-left"
            >
              Rentals
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100">
      <div v-if="activeTab === 'dashboard'">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <!-- Number of users -->
          <div class="grid p-4 mt-4 bg-orange-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-user"></i>User</h2>
            <p class="p-2 text-xl font-bold">{{ userStore.users.length }}</p>
          </div>
          <!-- Number of bikes -->
          <div class="grid p-4 mt-4 bg-blue-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-motorcycle"></i>Bikes</h2>
            <p class="p-2 text-xl font-bold">{{ bikeStore.bikes.length }}</p>
          </div>
          <!-- Number of Location/Store -->
          <div class="grid p-4 mt-4 bg-green-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-inbox"></i>Rentals</h2>
            <p class="p-2 text-xl font-bold">{{ rentalStore.rentals.length }}</p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'users'">
        <adminUser />
      </div>
      <div v-if="activeTab === 'bikes'">
        <adminBike />
      </div>
      <div v-if="activeTab === 'brands'">
        <adminBrand />
      </div>
      <div v-if="activeTab === 'rentals'">
        <adminRental />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Active tab styles */
button.bg-gray-700 {
  background-color: #4a5568;
}
</style>
