<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from '@/components/Navbar.vue'
import BookingForm from '@/components/BookingForm.vue'
import FooterForm from '@/components/FooterForm.vue'
import useBikeStore from '@/stores/bikesData.js'

const route = useRoute()
let bikeStore = useBikeStore()

onMounted(() => {
  bikeStore.fetchBikeById(route.params.id)
})
</script>

<template>
  <Navbar />
  <div class="container px-6 py-40 mx-auto">
    <!-- Bike Details Section (Left) -->
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <!-- Bike Information -->
      <div class="space-y-6">
        <h2 class="text-4xl font-bold">{{ bikeStore.bike?.bike_name || 'Loading...' }}</h2>
        <p class="text-xl font-semibold">
          {{ `$${bikeStore.bike?.price_by_day}/day` || 'Loading...' }}
        </p>
        <p>Hanoi. Danang. HCMC.</p>
        <img
          loading="lazy"
          :src="bikeStore.bike?.image"
          alt="Honda CRF 300"
          class="w-full h-auto"
        />
        <p class="p-2 font-medium text-gray-600">
          {{ bikeStore.bike?.description || 'Loading...' }}
        </p>
      </div>
      <BookingForm />
    </div>
  </div>
  <FooterForm />
</template>
<style></style>
