<script setup>
import { ref } from "vue"
const message = ref("Hello from Vue!")

const clickHandler = () => {
  message.value = "Button clicked!"
}
alert("YouDidIt component loaded")
</script>

<template>
  <h1>You did it!</h1>
  <button @click="clickHandler">Click me</button>
  <p>{{ message }}</p>
  <br />
  <input
    v-model="message"
    type="text"
    @change="console.log('Text changed')"
    @input="console.log('You have typed: ' + $event.target.value)"
    @keydown="console.log('Key pressed: ' + $event.key)"
  />
</template>
