import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    pending: true
  }),
  actions: {
    setPending (pending: boolean) {
      this.pending = pending
    }
  }
})
