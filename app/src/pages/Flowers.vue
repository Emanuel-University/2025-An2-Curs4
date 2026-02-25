<script setup>
import GreenFlower from '@/components/flowers/GreenFlower.vue'
import WaterTheFlower from '@/components/flowers/WaterTheFlower.vue'

import { ref } from 'vue'
const flower1 = ref(10);
const flower2 = ref(50);
const flower3 = ref(30);
const flower4 = ref(70);

const waterTheFlower = (flower) => {
    switch(flower) {
        case 1:
            flower1.value += 10;
            break;
        case 2:
            flower2.value += 10;
            break;
        case 3:
            flower3.value += 10;
            break;
        case 4:
            flower4.value += 10;
            break;
    }
};
</script>

<template>
    <h3>Growth</h3>
    <div class="w-5/6 mx-auto">
        <div class="flex justify-between w-full">
            <WaterTheFlower 
                    v-for="flower in [1,2,3,4]" 
                    :key="flower" 
                    @water="waterTheFlower(flower)" />
            <!-- 
            <WaterTheFlower @water="waterTheFlower(1)" />
            <WaterTheFlower @water="waterTheFlower(2)" />
            <WaterTheFlower @water="waterTheFlower(3)" />
            <WaterTheFlower @water="waterTheFlower(4)" /> -->
        </div>
    </div>
    <hr>
    <div class="w-5/6 mx-auto">
        <div class="grid grid-cols-4 content-end gap-4 w-full" style="height: 300px;">
            <!-- <GreenFlower v-for="flower in [0,1,2,3]" :key="flower" :height="10" /> -->
            <GreenFlower :height="flower1" :winner="flower1 >= 300" />
            <GreenFlower :height="flower2" :winner="flower2 >= 300" />
            <GreenFlower :height="flower3" :winner="flower3 >= 300" />
            <GreenFlower :height="flower4" :winner="flower4 >= 300" />
        </div>
    </div>
    <hr>
</template>

<style>
 @import "bootstrap-icons";
 @import "tailwindcss";
</style>
