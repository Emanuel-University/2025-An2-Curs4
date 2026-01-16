<script setup>
const emit = defineEmits(["update:task:title"])

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

import TaskCheckbox from "./TaskCheckbox.vue"
import TaskActions from "./TaskActions.vue"

import { ref } from "vue"
const isEditMode = ref(false)
const taskEditTitle = ref(props.task.title)

const saveTaskTitle = () => {
  emit("update:task:title", taskEditTitle.value)
  isEditMode.value = false
}
</script>

<template>
  <div class="grid grid-cols-8 gap-2">
    <TaskCheckbox />
    <div v-if="!isEditMode" class="col-span-6" @click="isEditMode = true">{{ task.title }}</div>
    <div v-else class="col-span-6">
      <input
        v-model="taskEditTitle"
        type="text"
        class="w-full bg-yellow-100"
        @keyup.enter="saveTaskTitle"
      />
    </div>
    <TaskActions :taskId="task.id" :isFavorite="task.favorite" />
  </div>
</template>
