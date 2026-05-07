import { createApp } from "vue"

import { createPinia } from "pinia"
const pinia = createPinia()

import App from "./App.vue"
import router from "./router"

createApp(App).use(pinia).use(router).mount("#app")

export const ws = new WebSocket("ws://localhost:7878")
ws.onopen = ws => {
  console.log(`Connected to server: ${ws}`)
}

import { useTask } from "@/stores/task"
ws.onmessage = data => {
  const taskStore = useTask()
  taskStore.tasks = JSON.parse(data.data)

  console.log(`Message from server: ${data.data}`, data.data)
}
