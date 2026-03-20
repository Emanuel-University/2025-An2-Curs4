<script setup>
import { useTask } from "@/stores/task"
const taskStore = useTask()

defineProps({
  taskId: {
    type: Number,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center justify-center">
    <input type="checkbox" :checked="isDone" @change="taskStore.toggleDone(taskId)" />
  </div>
</template>
