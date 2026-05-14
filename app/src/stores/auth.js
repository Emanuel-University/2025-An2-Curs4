import router from "@/router"
import { defineStore } from "pinia"
import axios from "axios"

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    isAuthenticated: Boolean(localStorage.getItem("token"))
  }),
  actions: {
    async checkCredentials(username, password) {
      try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          username,
          password
        })
        console.log("Login response:", response.data)
        if (response.data.success && response.data.token) {
          this.token = response.data.token
          localStorage.setItem("token", response.data.token)
          this.isAuthenticated = true
          router.push("/") // Redirect to home page after successful login
        } else {
          this.token = ""
          localStorage.removeItem("token")
          this.isAuthenticated = false
          return response.data.message
        }
      } catch (error) {
        this.token = ""
        localStorage.removeItem("token")
        this.isAuthenticated = false
        return "An error occurred. Please try again."
      }
    },
    logout() {
      this.token = ""
      localStorage.removeItem("token")
      this.isAuthenticated = false
      router.push("/login") // Redirect to login page after logout
    }
  }
})
