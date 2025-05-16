<template>
  <div class="flex flex-col items-center">
    <div class="text-5xl font-bold text-blue-500 mb-2">{{ count }}</div>
    <div class="flex space-x-2">
      <button 
        @click="count++"
        class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Increase
      </button>
      <button 
        @click="count--"
        class="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors"
      >
        Decrease
      </button>
    </div>
    <div class="mt-2 text-gray-600 text-sm">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initial: {
    type: Number,
    default: 0
  },
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  }
})

const count = ref(props.initial)

const message = computed(() => {
  if (props.min !== null && count.value <= props.min) {
    return `Minimum value: ${props.min}`
  }
  if (props.max !== null && count.value >= props.max) {
    return `Maximum value: ${props.max}`
  }
  return `Current count: ${count.value}`
})
</script>
