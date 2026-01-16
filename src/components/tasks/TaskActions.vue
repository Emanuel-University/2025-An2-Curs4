<script setup>
import { useTask } from "@/stores/task"
const taskStore = useTask()

defineProps({
  taskId: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div>
    <button class="mr-2 cursor-pointer" @click="taskStore.toggleFavorite(taskId)">
      <i class="bi" :class="isFavorite ? 'bi-star-fill text-yellow-500' : 'bi-star'"></i>
    </button>
    <button class="cursor-pointer" @click="taskStore.removeTask(taskId)">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</template>
