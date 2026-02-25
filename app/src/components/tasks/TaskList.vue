<script setup>
import { useTask } from "@/stores/task"
const taskStore = useTask()

import TasksHeader from "./TasksHeader.vue"
import TaskBody from "./TaskBody.vue"
import TaskFooter from "./TaskFooter.vue"

import { onMounted } from "vue"
onMounted(() => {
  const tasks = localStorage.getItem("tasks")
  if (tasks) {
    taskStore.tasks = JSON.parse(tasks)
  }
})
</script>

<template>
  <TasksHeader />
  <TaskBody
    v-for="(task, index) in taskStore.tasks"
    :key="index"
    :task="task"
    @update:task:title="newTitle => taskStore.updateTaskTitle(task.id, newTitle)"
  />
  <TaskFooter />
</template>
