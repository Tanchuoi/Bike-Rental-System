<script setup></script>

<template>
  <section
    class="relative flex items-center h-[90vh] bg-center bg-cover bg-[url('@/assets/img/slider/slider-background.jpg')]"
  >
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <!-- Content -->
    <div
      class="container relative z-10 grid flex-col items-center justify-center h-full grid-cols-2 px-6 mx-auto md:flex-row md:justify-between"
    >
      <!-- Left side (Big text) -->
      <div class="space-y-4 font-black text-left text-white md:space-y-6">
        <h1 class="text-4xl leading-tight md:text-5xl lg:text-8xl">
          RENT.<br />TOUR.<br />DISCOVER.
        </h1>
      </div>

      <!-- Right side (Icons with text) -->
      <div class="mt-8 space-y-8 text-white md:mt-0">
        <div class="flex items-center space-x-4">
          <i class="text-4xl fas fa-motorcycle"></i>
          <div>
            <h3 class="text-lg font-semibold">39,500+ Riders Served</h3>
            <p>
              One of VN's most trusted motorcycle tour and rental companies—Hanoi, Danang and HCMC
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <i class="text-4xl fas fa-tools"></i>
          <div>
            <h3 class="text-lg font-semibold">Quality Motorcycles</h3>
            <p>
              Late-model Honda, Yamaha, Royal Enfield and BMW scooters, tourers, classic bikes, and
              dual-sports
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <i class="text-4xl fas fa-user-cog"></i>
          <div>
            <h3 class="text-lg font-semibold">Established 2004</h3>
            <p>Expert service from our experienced team of mechanics and licensed tour leaders</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
