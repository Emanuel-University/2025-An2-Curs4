import router from "@/router"
import { defineStore } from "pinia"
import axios from "@/api"

const API_URL = "http://localhost:3000/auth"

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    isAuthenticated: Boolean(localStorage.getItem("token"))
  }),
  actions: {
    async checkCredentials(username, password) {
      try {
        const response = await axios.post(`${API_URL}/login`, {
          username,
          password
        })
        console.log("Login response:", response.data)
        if (response.data.success && response.data.token && response.data.refreshToken) {
          this.setTokens(response.data.token, response.data.refreshToken)
          router.push("/") // Redirect to home page after successful login
        } else {
          this.clearTokens()
          return response.data.message
        }
      } catch (error) {
        this.clearTokens()
        return "An error occurred. Please try again."
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) {
        return false
      }

      try {
        const response = await axios.post(`${API_URL}/refresh`, {
          refreshToken: this.refreshToken
        })

        if (response.data.success && response.data.token && response.data.refreshToken) {
          this.setTokens(response.data.token, response.data.refreshToken)
          return true
        } else {
          this.clearTokens()
          router.push("/login")
        }
      } catch {
        this.clearTokens()
        router.push("/login")
      }

      return false
    },
    setTokens(token, refreshToken) {
      this.token = token
      this.refreshToken = refreshToken
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      this.isAuthenticated = true
    },
    clearTokens() {
      this.token = ""
      this.refreshToken = ""
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      this.isAuthenticated = false
    },
    logout() {
      this.clearTokens()
      router.push("/login") // Redirect to login page after logout
    }
  }
})
