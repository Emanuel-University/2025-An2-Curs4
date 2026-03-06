<script setup>
import { useAuth } from "@/stores/auth"
import { useRouter } from "vue-router"
const auth = useAuth()
const router = useRouter()
</script>

<template>
  <header v-if="auth.isAuthenticated" class="bg-gray-200 p-4">
    <nav class="mb-4 flex gap-4">
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink to="/flowers"> Flowers </RouterLink>
      <RouterLink to="/computed"> Computed </RouterLink>
      <RouterLink to="/store"> Store </RouterLink>
      <RouterLink to="/tasks"> Tasks </RouterLink>
    </nav>
  </header>
  <RouterView v-if="!auth.isAuthenticated || router.currentRoute.value.path === '/login'" />
</template>

<style>
@import "bootstrap-icons";
@import "tailwindcss";

.btn-primary {
  background-color: rgb(192, 235, 238);
}
</style>
