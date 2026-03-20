import axios from "axios"
import { defineStore } from "pinia"

export const useTask = defineStore("task", {
  state: () => ({
    tasks: []
  }),
  actions: {
    async getTasks() {
      try {
        const getTasksFromAPI = await axios.get("http://localhost:3000/task/get-all")
        this.tasks = getTasksFromAPI.data
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    },
    async addTask(task) {
      this.tasks.push(task)
      try {
        await axios.post("http://localhost:3000/task/add", { task })
      } catch (error) {
        console.error("Error adding task:", error)
      }
    },
    async removeTask(id) {
      this.tasks.splice(
        this.tasks.findIndex(task => task.id === id),
        1
      )
      try {
        await axios.delete()
      } catch (error) {
        console.error("Error removing task:", error)
      }
    },
    updateTaskTitle(id, newTitle) {
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].title = newTitle
      localStorage.setItem("tasks", JSON.stringify(this.tasks))
    },
    toggleFavorite(id) {
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].favorite = !this.tasks[index].favorite
      localStorage.setItem("tasks", JSON.stringify(this.tasks))
    },
    toggleDone(id) {
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].done = !this.tasks[index].done
      localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }
  }
})
