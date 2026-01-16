import { defineStore } from "pinia"

export const useTask = defineStore("task", {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Learn Vue",
        done: false,
        favorite: false
      },
      {
        id: 2,
        title: "Learn Pinia",
        done: false,
        favorite: false
      }
    ]
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task)
      localStorage.setItem("tasks", JSON.stringify(this.tasks))
    },
    removeTask(id) {
      this.tasks.splice(
        this.tasks.findIndex(task => task.id === id),
        1
      )
      localStorage.setItem("tasks", JSON.stringify(this.tasks))
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
