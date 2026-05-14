import { createRouter, createWebHistory } from "vue-router"

import Flowers from "@/pages/Flowers.vue"
import Tests from "@/pages/Tests.vue"
import Computed from "@/pages/Computed.vue"
import StorePage from "@/pages/StorePage.vue"
import TaskPage from "@/pages/TaskPage.vue"
import LoginPage from "@/pages/LoginPage.vue"

import { useAuth } from "@/stores/auth"

const routes = [
  { path: "/", component: Tests, meta: { requiresAuth: true } },
  { path: "/flowers", component: Flowers, meta: { requiresAuth: true } },
  { path: "/computed", component: Computed, meta: { requiresAuth: true } },
  { path: "/store", component: StorePage, meta: { requiresAuth: true } },
  { path: "/tasks", component: TaskPage, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "btn-primary border"
})

router.beforeEach(to => {
  const auth = useAuth()

  if (to.path === "/login" && auth.isAuthenticated) {
    return "/"
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return "/login"
  }

  return true
})

export default router
