<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priceByDay: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  maxEngine: {
    type: Number,
    required: true
  },
  gasCapacity: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="">
    <h1 class="p-2 text-4xl font-bold">{{ props.name }}</h1>
    <p class="ml-2 font-semibold">{{ props.priceByDay }}$/day</p>
    <img
      loading="lazy"
      :src="props.image"
      alt="{{ props.name }}"
      class="object-contain w-full h-48 p-2 transition duration-300 ease-in-out origin-center transform hover:scale-110"
    />
    <p class="px-10 py-3">{{ props.overview }}</p>
    <div class="flex items-center content-center px-8">
      <i class="ml-2 mr-2 fa-solid fa-gas-pump"></i>
      <p class="mr-20">{{ props.gasCapacity }} litres</p>
      <i class="ml-2 mr-2 fa-solid fa-gauge-high"></i>
      <p>{{ props.maxEngine }} cc</p>
    </div>
    <div class="flex items-center justify-center">
      <router-link :to="`bike-rental/${props.id}`" class="flex-1">
        <button
          class="w-[95%] my-4 text-white transition ease-linear delay-75 bg-black border-2 border-black border-solid rounded-xl btn hover:bg-white hover:text-black h-9"
        >
          Book Now
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.scale-up-center {
  -webkit-animation: scale-up-center 0.4s ease-in both;
  animation: scale-up-center 0.4s ease-in both;
}
</style>
