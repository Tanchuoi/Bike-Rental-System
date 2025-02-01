import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/bikes-list',
      name: 'bikes-list',
      component: () => import('../views/BikesListView.vue')
    },
    {
      path: '/bike-rental/:id',
      name: 'bike-rental/:id',
      component: () => import('../views/BikeRentalView.vue')
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: () => import('../views/ThanksView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})
// Add navigation guard
router.beforeEach(async (to) => {
  const userData = JSON.parse(localStorage.getItem('user'))

  // Check if route requires admin access
  if (to.meta.requiresAdmin) {
    if (!userData || userData.user.role !== 'admin') {
      // Redirect non-admin users to the login page
      return { name: 'login' }
    }
  }
})
export default router
