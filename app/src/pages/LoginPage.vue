<script setup>
import { useAuth } from "@/stores/auth"
import { ref } from "vue"
const auth = useAuth()

const authentification = () => {
  auth.checkCredentials(username.value, password.value)
}

const username = ref("")
const password = ref("")
</script>

<template>
  <div class="grid h-full place-items-center">
    <h1>Login Page</h1>
    <div>
      <input v-model="username" type="text" placeholder="Username" class="mb-2 border p-2" />
    </div>

    <div>
      <input v-model="password" type="password" placeholder="Password" class="mb-2 border p-2" />
    </div>
    <button class="rounded bg-blue-500 px-4 py-2 text-white" @click="authentification">
      Login
    </button>
  </div>
</template>
