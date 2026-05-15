import axios from "axios"

import { useAuth } from "@/stores/auth.js"

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == 401) {
      const auth = useAuth()
      auth.logout()
    }
    throw new Error("Invalid token detected")
  }
)

export default axios
