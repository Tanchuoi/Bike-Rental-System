<script setup>
import router from '@/router'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { sendReceiptMail } from '@/services/mail.service'
import useRentalStore from '@/stores/rentalData'
import useBikeStore from '@/stores/bikesData'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { format } from 'date-fns'

const toast = useToast()

const route = useRoute()
let bikeStore = useBikeStore()
let rentalStore = useRentalStore()

onMounted(() => {
  bikeStore.fetchBikeById(route.params.id)
})

let isRental = ref(true)
let isDetails = ref(false)

let duration = ref(1)
let city = ref('')
let motorcycleCount = ref(1)
let startDate = ref('')
let name = ref('')
let email = ref('')
let phone = ref('')
let message = ref('')

const total = computed(() => {
  return bikeStore.bike?.price_by_day * duration.value * motorcycleCount.value
})

const toggleRental = () => {
  isRental.value = true
  isDetails.value = false
}

const toggleDetails = () => {
  if (validateRentalForm()) {
    isRental.value = false
    isDetails.value = true
  }
}

const showSuccessToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Rent Successfully!',
    life: 3000
  })
}

const showErrorToast = () => {
  toast.add({
    severity: 'error',
    summary: 'You are not login',
    detail: 'Please login for renting',
    life: 3000
  })
}

const calculateExpiryDate = (startDate, rentalDuration) => {
  const start = new Date(startDate)

  // Add the duration in milliseconds (days * milliseconds per day)
  const expiryDate = new Date(start.getTime() + rentalDuration * 24 * 60 * 60 * 1000)

  // Format as 'YYYY-MM-DD' if needed for consistency
  const year = expiryDate.getFullYear()
  const month = String(expiryDate.getMonth() + 1).padStart(2, '0')
  const day = String(expiryDate.getDate()).padStart(2, '0')

  return `${day}-${month}-${year}`
}

const validateRentalForm = () => {
  if (!city.value || !motorcycleCount.value || !startDate.value) {
    alert('Please fill in all required fields')
    return false
  }
  return true
}
console.log(calculateExpiryDate('2024-11-29', 4)) // Should output '2024-12-03'

//Rental end need fix
const addRental = () => {
  rentalStore
    .addRental({
      user_id: JSON.parse(localStorage.getItem('user')).user.id,
      bike_id: bikeStore.bike?.id,
      rental_start: format(new Date(startDate.value), 'dd-MM-yyyy'),
      rental_end: calculateExpiryDate(startDate.value, duration.value),
      city: city.value,
      quantity: motorcycleCount.value,
      user_name: name.value,
      phone_number: phone.value,
      email: email.value,
      bike_name: bikeStore.bike?.bike_name,
      message: message.value,
      total_price: total.value
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
}
const handleSubmit = (event) => {
  event.preventDefault()

  const userDataString = localStorage.getItem('user')
  const userData = JSON.parse(userDataString)

  if (!validateDetailsForm()) {
    return
  }

  if (!userData || !userData.token) {
    showErrorToast()
    return
  }
  showSuccessToast()

  sendReceiptMail({
    to: email.value,
    subject: 'Receipt for Your Rental',
    city: city.value,
    quantity: motorcycleCount.value,
    startDate: format(new Date(startDate.value), 'dd-MM-yyyy'),
    rentalDuration: duration.value,
    rentalEnd: calculateExpiryDate(startDate.value, duration.value),
    name: name.value,
    phoneNumber: phone.value,
    message: message.value,
    bikeName: bikeStore.bike?.bike_name,
    bikePrice: bikeStore.bike?.price_by_day,
    totalPrice: total.value
  })
    .then((responseMessage) => {
      console.log('Bike Image URL:', bikeStore.bike?.image)
      console.log(responseMessage)
      router.push('/Thanks')
    })
    .catch((errorMessage) => {
      console.error(errorMessage)
    })

  addRental()
}

const validateDetailsForm = () => {
  if (!name.value || !email.value || !phone.value) {
    alert('Please fill in all required fields in the details form')
    return false
  }
  return true
}
</script>

<template>
  <div>
    <Toast />
    <!-- Booking Section (Right) -->
    <div class="space-y-6">
      <h2 class="text-3xl font-bold">BOOK NOW</h2>
      <div class="border-b border-gray-300">
        <ul class="flex space-x-4 text-lg">
          <li class="pb-2 border-b-2 border-black">
            <button :class="{ btnActive: isRental }" @click="toggleRental()">Rental</button>
          </li>
          <li class="pb-2 border-b-2 border-black">
            <button :class="{ btnActive: isDetails }" @click="toggleDetails()">Details</button>
          </li>
        </ul>
      </div>

      <!-- Rental Form Inputs -->
      <form v-if="isRental" @submit.prevent="toggleDetails" class="space-y-6">
        <div>
          <label for="city" class="block font-medium border-black border-solid">
            City: <span class="font-bold text-red-500">*</span>
          </label>
          <select
            v-model="city"
            required
            id="city"
            placeholder="Choose..."
            class="block w-full px-4 mt-2 border-gray-300 rounded-md shadow-sm borderForm"
          >
            <option value="">Choose...</option>
            <option>Hanoi</option>
            <option>Danang</option>
            <option>HCMC</option>
          </select>
        </div>

        <div>
          <label class="block font-medium">
            Number of Motorcycles: <span class="font-bold text-red-500">*</span>
          </label>
          <div class="flex mt-2 space-x-4">
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="1"
              />
              1</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="2"
              />
              2</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="3"
              />
              3</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="4"
              />
              4</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="5"
              />
              5</label
            >
          </div>
        </div>

        <div>
          <label for="start-date" class="block font-medium">
            Start date: <span class="font-bold text-red-500">*</span>
          </label>
          <input
            v-model="startDate"
            required
            type="date"
            id="start-date"
            class="block w-full p-4 mt-2 border-gray-300 rounded-md shadow-sm borderForm"
          />
        </div>

        <div>
          <label for="duration" class="block font-medium">
            Rental duration: <span class="font-bold text-red-500">*</span>
          </label>
          <input
            required
            type="range"
            id="duration"
            v-model="duration"
            min="1"
            max="30"
            class="block w-full mt-2"
          />
          <p>{{ duration }} days</p>
        </div>

        <button type="submit" class="w-full py-2 text-white bg-black rounded-md">Next</button>
      </form>

      <!-- Details Form Inputs -->
      <form v-if="isDetails" @submit.prevent="handleSubmit" class="space-y-6 smoother">
        <div class="">
          <div>
            <label for="first-name" class="block text-base font-medium"
              >Name: <span class="font-bold text-red-500">*</span></label
            >
            <input
              v-model="name"
              required
              type="text"
              id="first-name"
              class="w-full px-4 py-2 mt-2 border rounded-full borderForm"
              placeholder="Your name..."
            />
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-base font-medium"
            >Email: <span class="font-bold text-red-500">*</span></label
          >
          <input
            v-model="email"
            required
            type="email"
            id="email"
            class="w-full px-4 py-2 mt-2 border rounded-full borderForm"
            placeholder="Your email..."
          />
        </div>

        <!-- Phone Field -->
        <div>
          <label for="phone" class="block text-base font-medium"
            >Phone: <span class="font-bold text-red-500">*</span></label
          >
          <div class="relative">
            <input
              v-model="phone"
              required
              type="text"
              id="phone"
              class="w-full px-4 py-2 pr-4 mt-2 border rounded-full borderForm"
              placeholder="Your number..."
            />
          </div>
        </div>

        <!-- Message Field -->
        <div>
          <label for="message" class="block text-base font-medium">Message:</label>
          <textarea
            v-model="message"
            id="message"
            rows="4"
            class="w-full px-4 py-2 mt-2 border rounded-lg borderForm"
            placeholder="Your message..."
          ></textarea>
        </div>

        <!-- Total -->
        <div class="py-10 text-lg font-medium">
          <span>Total:</span>
          <span class="font-semibold"> ${{ total }}</span>
        </div>

        <!-- Submit Button -->

        <button
          @click="handleSubmit"
          type="submit"
          class="w-full py-3 text-white bg-black rounded-full"
        >
          Enquire Now
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btnActive {
  border-bottom: 2px solid black;
}

.borderForm {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  border: 2px solid black;
  height: 50px;
  border-radius: 25px;
}
</style>
