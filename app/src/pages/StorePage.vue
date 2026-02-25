<script setup>
import { useCounter } from '@/stores/counter';
const counter = useCounter();

counter.$subscribe((mutation, state) => {
    console.log('Mutation occurred:', mutation);
    console.log('New state:', state);
});

</script>

<template>
    <h3>Store Page</h3>
    Store counter demonstration!
    <button type="button" class="border" @click="counter.countUp()"> 
        Count Your Blessings {{ counter.count }}
    </button>
    <button type="button" class="border" @click="counter.countDown()"> 
        Decrease the counter {{ counter.count }}
    </button>
    Double Count from Getter: {{ counter.doubleCount }}
    <h4 class="text-xl">Reset Store</h4>
    <button class="border m-2" @click="counter.$reset()">Reset</button>
    <h4 class="text-xl">Patch state</h4>
    <button class="border m-2" @click="counter.$patch({
        count: 8,
        level: 5
    })">Set multiple state at the one time {{ counter.level }}</button>
</template>