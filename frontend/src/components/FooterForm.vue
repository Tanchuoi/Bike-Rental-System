<script setup>
import { ref } from 'vue'

import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

import { sendMail } from '@/services/mail.service.js'

const toast = useToast()

const email = ref('') // Local ref to store the email input
const message = ref('') // To store success or error message

const showSuccessToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Subscribe Successfully!',
    life: 3000
  })
}

const showErrorToast = () => {
  toast.add({ severity: 'error', summary: 'Error', detail: 'Subscribe failed', life: 3000 })
}

const handleSubmit = async () => {
  try {
    showSuccessToast()
    const responseMessage = await sendMail(email.value)
    message.value = responseMessage
  } catch (error) {
    showErrorToast()
    console.error(error)
  }
}
</script>

<template>
  <!-- Footer -->
  <footer id="contact" class="py-20 text-white bg-black">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-12">
        <div class="flex items-center justify-center md:col-span-4">
          <img
            src="@/assets/img/logo/Rentabike-Vietnam-Logo-White.png"
            alt="Rentabike Vietnam Logo"
            class="w-40 h-auto"
          />
        </div>
        <div class="mt-6 md:col-span-8">
          <!-- mailing list -->
          <h3 class="text-xl font-semibold">Mailing list</h3>

          <p>Subscribe to our newsletter for the latest updates and promotions</p>

          <Toast />
          <form @submit.prevent="handleSubmit" action="" class="">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="w-full p-2 my-6 mr-2 text-black bg-white border-2 border-white border-solid rounded-lg"
            />
            <br />
            <input type="checkbox" required name="" id="" /> I would like to receive occasional
            emails containing discounts, travel inspiration and special offers from Rentabike!
            <br />
            <button
              class="w-full px-4 py-2 mt-4 text-black transition ease-linear delay-75 bg-white border-2 border-white border-solid rounded-xl btn hover:bg-black hover:text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
