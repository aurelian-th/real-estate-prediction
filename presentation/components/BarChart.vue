<template>
  <div class="w-full">
    <div class="flex w-full h-64">
      <div v-for="(item, i) in data" :key="i" class="flex-1 flex flex-col justify-end mx-1">
        <div class="text-center text-sm text-gray-600 mb-1">{{ item.value }}%</div>
        <div 
          class="bg-blue-500 rounded-t w-full transition-all duration-1000 ease-out"
          :style="{ height: `${item.value}%` }"
        ></div>
        <div class="text-center text-sm mt-2">{{ item.label }}</div>
      </div>
    </div>
    <div class="mt-4 text-sm text-gray-600 text-center">{{ caption }}</div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  caption: {
    type: String,
    default: ''
  }
})
</script>
