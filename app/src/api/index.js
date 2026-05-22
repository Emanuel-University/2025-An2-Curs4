import axios from "axios"

import { useAuth } from "@/stores/auth.js"

axios.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      !error.config.url?.includes("/refresh")
    ) {
      error.config._retry = true
      const auth = useAuth()
      const refreshed = await auth.refreshAccessToken()
      if (refreshed) {
        error.config.headers["Authorization"] = `Bearer ${auth.token}`
        return axios(error.config)
      }
      auth.logout()
    }
    throw error
  }
)

export default axios
