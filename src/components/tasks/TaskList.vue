<script setup>
import { useTask } from "@/stores/task"
const taskStore = useTask()

import TasksHeader from "./TasksHeader.vue"
import TaskBody from "./TaskBody.vue"
import TaskFooter from "./TaskFooter.vue"
</script>

<template>
  <TasksHeader />
  <TaskBody v-for="(task, index) in taskStore.tasks" :key="index" :task="task" />
  <TaskFooter />
</template>
