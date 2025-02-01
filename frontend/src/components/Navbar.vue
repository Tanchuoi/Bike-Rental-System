<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import useUserStore from '@/stores/userData'

let userStore = useUserStore()
const isUserLoggedIn = computed(() => userStore.user) // Reactive check

let isHiddenMenu = ref(true)
let menuRef = ref(null)

function toggleMenu() {
  isHiddenMenu.value = !isHiddenMenu.value
}

function handleClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isHiddenMenu.value = true
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Navbar -->
  <nav
    ref="menuRef"
    class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between w-full p-4 bg-white shadow-lg"
  >
    <!-- Left Side: Hamburger Menu Icon -->
    <div class="flex items-center">
      <button @click="toggleMenu()" class="text-2xl focus:outline-none">
        <i class="ml-3 fa-solid fa-bars"></i>
      </button>
    </div>

    <!-- Center: Logo -->
    <div class="flex items-center">
      <routerLink to="/" class="text-xl font-bold tracking-widest">RENTABIKE</routerLink>
    </div>

    <!-- Right Side: Icons and Connect Button -->
    <div class="flex items-center space-x-4">
      <!-- Social Icons -->
      <a href="tel:+8479587455" class="text-xl">
        <!-- WhatsApp Icon (Font Awesome) -->
        <i class="fab fa-whatsapp"></i>
      </a>
      <a href="https://www.facebook.com/rentabikevn/?locale=vi_VN" class="text-xl">
        <!-- Messenger Icon (Font Awesome) -->
        <i class="fab fa-facebook-messenger"></i>
      </a>
      <a href="mailto:dhttgaming@gmail.com" class="text-xl">
        <!-- Email Icon (Font Awesome) -->
        <i class="far fa-envelope"></i>
      </a>

      <!-- Connect Button -->
      <routerLink
        to="/login"
        class="px-4 py-2 text-white transition bg-black rounded-full hover:bg-gray-800"
      >
        <span v-if="isUserLoggedIn">{{ userStore.user.user.username }}</span>
        <span v-else>Login</span>
      </routerLink>
      <button v-if="userStore.user" @click="userStore.logout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </div>
    <!-- Menu -->
    <div
      ref="menu"
      :class="{ 'translate-x-0': !isHiddenMenu, '-translate-x-full': isHiddenMenu }"
      class="fixed inset-0 z-40 w-1/3 mt-[72px] bg-white menu"
    >
      <div class="flex flex-col h-full">
        <router-link to="/" class="p-4 text-2xl font-bold">Home</router-link>
        <router-link to="/bikes-list" class="p-4 text-2xl font-bold">Bikes</router-link>
        <a class="p-4 text-2xl font-bold" href="#contact">Contact Us</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.menu {
  transition: transform 0.3s;
  border-right: 1px solid #ccc;
}
</style>
