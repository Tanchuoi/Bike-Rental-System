<script setup>
// import { ref } from 'vue'
// import { onMounted } from 'vue'

//Components
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import FooterForm from '@/components/FooterForm.vue'
import Swiper from '@/components/Swiper.vue'
</script>

<template>
  <body class="bg-gray-100">
    <!-- Navbar -->
    <navbar />
    <!-- Hero -->
    <Hero />

    <!-- Motorcycle Rentals Section -->
    <section id="bikeRental" class="w-full py-16 bg-white">
      <div class="container grid grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        <!-- Left Section: Motorcycle Info -->
        <div class="p-6 bg-white">
          <h1 class="text-4xl font-bold">MOTORCYCLE RENTALS</h1>
          <p class="py-4 text-xl">
            Professionally maintained late-model Honda, Royal Enfield, BMW and Yamaha motorcycles.
          </p>
          <ul class="space-y-4">
            <li class="flex items-center">
              <i class="text-xl text-green-500 fa-solid fa-circle-check"></i>
              <span class="ml-4 text-lg">Garages in Hanoi, Danang and HCM City</span>
            </li>
            <li class="flex items-center">
              <i class="text-xl text-green-500 fa-solid fa-circle-check"></i>
              <span class="ml-4 text-lg">Save money with awesome Tourist and Expat deals</span>
            </li>
            <li class="flex items-center">
              <i class="text-xl text-green-500 fa-solid fa-circle-check"></i>
              <span class="ml-4 text-lg"
                >One-Way Rental, Guides and Damage Waiver add-ons available</span
              >
            </li>
          </ul>
        </div>

        <!-- Right Section: Bikes Display (2 Bikes per row) -->
        <div class="col-span-2">
          <Swiper />
        </div>
      </div>

      <router-link to="bikes-list" class="float-right p-4 font-semibold">
        All Motorcycle Rentals >>
      </router-link>
    </section>

    <!-- Motorcycle Location -->
    <!-- <section id="location" class="py-16 bg-gray-100">
      <div class="container mx-auto">
        <h2 class="mb-8 text-3xl font-bold text-center">Motorcycle Locations</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"> -->
    <!-- Location 1 -->
    <!-- <div class="p-6 bg-white rounded-lg shadow-lg">
            <div id="map"></div> -->
    <!-- Google Map container -->
    <!-- </div>
        </div>
      </div>
    </section> -->

    <FooterForm />
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js"></script> -->
  </body>
</template>

<style scoped></style>
