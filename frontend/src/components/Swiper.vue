<script setup>
import { onMounted } from 'vue'
import useBikesStore from '@/stores/bikesData.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import BikeCard from './BikeCard.vue'
import 'swiper/css'
import { Pagination } from 'swiper/modules'

const bikesStore = useBikesStore()

onMounted(() => {
  bikesStore.fetchBikes()
})
</script>

<template>
  <swiper
    :slidesPerView="2"
    :spaceBetween="0"
    :pagination="{ clickable: true }"
    :modules="[Pagination]"
    class="mySwiper"
  >
    <swiper-slide v-for="bike in bikesStore.bikes" :key="bike.id">
      <BikeCard
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
    </swiper-slide>
  </swiper>
</template>
