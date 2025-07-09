import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWebavStore = defineStore('webavStore', () => {
  const avCvs = ref(null)
  function setAvCvs(ele) {
    avCvs.value = ele
  }

  return { avCvs, setAvCvs }
})
