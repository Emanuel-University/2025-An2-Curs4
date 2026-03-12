import router from "@/router"
import { defineStore } from "pinia"
import axios from "axios"

const VALID_USERNAME = "user"
const VALID_PASSWORD = "pass"

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
