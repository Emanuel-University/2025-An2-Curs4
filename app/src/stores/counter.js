import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
  state: () => ({
    count: 13,
    level: 1
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    triprleCount: (state) => state.count * 3
  },
  actions: {
    countUp() {
      this.count++
    },
    countDown() {
      this.count--
    }
  }
})