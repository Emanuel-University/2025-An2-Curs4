<script setup>
import { RouterLink } from 'vue-router'

import YouDidIt from '@/components/YouDidIt.vue'
import BindLink from '@/components/BindLink.vue'
import RandomNumber from '@/components/RandomNumber.vue'
import CountYourBlessings from '@/components/CountYourBlessings.vue'
import HeaderWithIcon from '@/components/HeaderWithIcon.vue'
import StudentsGrades from '@/components/StudentsGrades.vue'
import CurrencyConverter from '@/components/CurrencyConverter.vue'

import { onMounted, onUpdated } from 'vue'
onMounted(() => {
  console.log('App mounted')
})

onUpdated(() => {
  console.log('App updated')
})

import { ref } from 'vue'
const showIcons = ref(false)
</script>

<template>
  <YouDidIt />
  <hr>
  <RouterLink to="/flowers">Flowers</RouterLink>
  <hr>
  <BindLink />
  <hr>
  <RandomNumber />
  <hr>
  <CountYourBlessings startCount="7" />
  <CountYourBlessings :startCount="3+5" />
  <CountYourBlessings startCount="9" />
  <hr>
  <input type="checkbox" v-model="showIcons"> Show Bootstrap Icons
  <div v-if="showIcons">
    <HeaderWithIcon 
      v-for="(header, index) of [1,2,3]" 
      :key="index" />
    <HeaderWithIcon />
  </div>
  <hr>
  <StudentsGrades />
  <hr>
  <CurrencyConverter />
</template>

<style>
 @import "bootstrap-icons";
 /* @import "tailwindcss"; */
</style>
