import router from "@/router"
import { defineStore } from "pinia"
import axios from "axios"

export const useAuth = defineStore("auth", {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    async checkCredentials(username, password) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username,
          password
        })
        console.log("Login response:", response.data)
        if (response.data.success) {
          this.isAuthenticated = true
          router.push("/") // Redirect to home page after successful login
        } else {
          this.isAuthenticated = false
        }
      } catch (error) {
        this.isAuthenticated = false
      }
    },
    logout() {
      this.isAuthenticated = false
      router.push("/login") // Redirect to login page after logout
    }
  }
})
