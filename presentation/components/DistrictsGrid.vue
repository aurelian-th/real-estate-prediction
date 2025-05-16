<template>
  <div class="slidev-layout default">
    <h1>{{ title }}</h1>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    
    <div class="grid-districts">
      <div v-for="(district, index) in districts" :key="index" class="district-card">
        <h3>{{ district.name }}</h3>
        <div class="district-price">{{ district.price }} €/m²</div>
        <div class="view-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
          </svg>
          View Properties
        </div>
      </div>
    </div>
    
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Explore Chișinău Districts'
  },
  subtitle: {
    type: String,
    default: 'Discover real estate opportunities across different areas of the city'
  },
  districts: {
    type: Array,
    default: () => [
      { name: 'Botanica', price: '950' },
      { name: 'Centru', price: '1150' },
      { name: 'Ciocana', price: '850' },
      { name: 'Rîșcani', price: '900' },
      { name: 'Buiucani', price: '920' }
    ]
  }
})
</script>
