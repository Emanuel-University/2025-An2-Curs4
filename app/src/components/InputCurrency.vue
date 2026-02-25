<script setup>
defineProps(['value'])
</script>

<template>
    <input type="number" :value="value" @input="$emit('changeValue', $event.target.value)" />
</template>