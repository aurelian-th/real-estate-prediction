<template>
  <div class="property-counter">
    <div class="counter-title" v-if="title">{{ title }}</div>
    <div class="counter-display">
      <div class="counter-value">{{ count }}</div>
      <div class="counter-label" v-if="label">{{ label }}</div>
    </div>
    <div class="counter-controls">
      <button 
        @click="decreaseCount"
        class="counter-btn decrease"
        :disabled="isAtMin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      </button>
      <button 
        @click="increaseCount"
        class="counter-btn increase"
        :disabled="isAtMax"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </div>
    <div class="counter-message" v-if="showMessage">{{ message }}</div>
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
  },
  title: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  showMessage: {
    type: Boolean,
    default: true
  }
})

const count = ref(props.initial)

const isAtMin = computed(() => props.min !== null && count.value <= props.min)
const isAtMax = computed(() => props.max !== null && count.value >= props.max)

const message = computed(() => {
  if (isAtMin.value) {
    return `Minimum value: ${props.min}`
  }
  if (isAtMax.value) {
    return `Maximum value: ${props.max}`
  }
  return `Current count: ${count.value}`
})

function increaseCount() {
  if (!isAtMax.value) {
    count.value++
  }
}

function decreaseCount() {
  if (!isAtMin.value) {
    count.value--
  }
}
</script>

<style scoped>
.property-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-counter:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.counter-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a2a54;
  margin-bottom: 0.75rem;
  text-align: center;
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.25rem;
}

.counter-value {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--brand-blue, #3b65de);
  line-height: 1;
  transition: all 0.3s ease;
}

.counter-label {
  font-size: 0.95rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.counter-controls {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.counter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.counter-btn.increase {
  background-color: var(--brand-blue, #3b65de);
  color: white;
}

.counter-btn.decrease {
  background-color: #e5e7eb;
  color: #4b5563;
}

.counter-btn.increase:hover:not(:disabled) {
  background-color: var(--brand-dark, #2a4bb9);
  transform: scale(1.05);
}

.counter-btn.decrease:hover:not(:disabled) {
  background-color: #d1d5db;
  transform: scale(1.05);
}

.counter-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter-message {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
