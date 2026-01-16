<script setup>
import { useTask } from "@/stores/task"
const taskStore = useTask()

const addNewTask = () => {
  taskStore.addTask({
    id: Math.floor(Math.random() * 1000000),
    title: newTaskTitle.value,
    done: false,
    favorite: false
  })
  isAddingTask.value = false
}

const newTaskTitle = ref("")

import { ref } from "vue"
const isAddingTask = ref(false)
</script>

<template>
  <div v-if="!isAddingTask">
    <button
      type="button"
      class="ml-4 rounded bg-blue-500 px-2 text-white"
      @click="isAddingTask = true"
    >
      Add new task
    </button>
  </div>
  <div v-else>
    <input
      v-model="newTaskTitle"
      type="text"
      placeholder="Enter task description"
      class="ml-4 rounded border border-gray-300 px-2 py-1"
    />
    <button type="button" class="ml-2 rounded bg-green-500 px-2 text-white" @click="addNewTask">
      Save
    </button>
    <button
      type="button"
      class="ml-2 rounded bg-red-500 px-2 text-white"
      @click="isAddingTask = false"
    >
      Cancel
    </button>
  </div>
</template>
