<script setup>
 import InputCurrency from '@/components/InputCurrency.vue'

 import { ref } from 'vue'
 const currencyEUR = ref(0);
 const currencyRON = ref(0);
 const cursEURRON = ref(4.9);

 const computeEURToRON = (value) => {
   currencyEUR.value = value;
   currencyRON.value = (value * cursEURRON.value).toFixed(2);
 };
const computeRONToEUR = (value) => {
   currencyRON.value = value;
   currencyEUR.value = (value / cursEURRON.value).toFixed(2);
 };
 const recalculateCurrency = () => {
    computeRONToEUR(currencyRON.value);
    computeEURToRON(currencyEUR.value);
 }
</script>

<template>
  <h3>Currency Converter</h3>
  <InputCurrency :value="currencyEUR" @changeValue="computeEURToRON" />
  <input type="number" v-model="cursEURRON" @input="recalculateCurrency" />
  <InputCurrency :value="currencyRON" @changeValue="computeRONToEUR" />
</template>