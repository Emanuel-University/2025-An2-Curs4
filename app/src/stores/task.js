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
        await axios.delete(`http://localhost:3000/task/delete`, { data: { id } })
      } catch (error) {
        console.error("Error removing task:", error)
      }
    },
    async updateTaskTitle(id, newTitle) {
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].title = newTitle
      try {
        await axios.put(`http://localhost:3000/task/update-title`, { id, newTitle })
      } catch (error) {
        console.error("Error updating task title:", error)
      }
    },
    async toggleFavorite(id) {
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].favorite = !this.tasks[index].favorite
      try {
        await axios.put(`http://localhost:3000/task/update-favorite`, { id })
      } catch (error) {
        console.error("Error toggling favorite status:", error)
      }
    },
    async toggleDone(id) {
      const index = this.tasks.findIndex(task => task.id === id)
      this.tasks[index].done = !this.tasks[index].done
      try {
        await axios.put(`http://localhost:3000/task/update-done`, { id })
      } catch (error) {
        console.error("Error toggling done status:", error)
      }
    }
  }
})
