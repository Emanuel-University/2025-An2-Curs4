<script setup>
import { useCounter } from '@/stores/counter'
const counterStore = useCounter()

const props = defineProps(['startCount'])

import { ref } from 'vue'
const counter = ref(props.startCount)
const incrementCounter = () => {
  counter.value++
}
</script>

<template>
  <h3>Counter</h3>
  <!-- {{ startCount }} -->
  <button class="border" @click="counter++">Increment v1</button>
  <button class="border" @click="incrementCounter">Increment v2</button>
  <button class="border" @click="counterStore.count++">
    Increment v3 {{ counterStore.count }}
  </button>
  <div>{{ counter }}</div>
</template>