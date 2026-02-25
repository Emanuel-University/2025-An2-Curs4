<script setup>
import BootstrapIcons from './BootstrapIcons.vue';
import { ref } from 'vue'

const icons = ['brightness-high', 'bell', 'cloud', 'heart', 'star'];
const icon = ref(icons[0]);

const changeIcon = () => {
 icon.value = icons[Math.floor(Math.random() * icons.length)];
};
</script>

<template>
    <h3>Bootstrap Icons 
        <BootstrapIcons 
          :icon="icon"
          @iconClick="changeIcon"/>
    </h3>
</template>