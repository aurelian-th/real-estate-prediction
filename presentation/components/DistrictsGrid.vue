<template>
  <div class="districts-container">
    <h1 class="title" v-if="showTitle">{{ title }}</h1>
    <p v-if="subtitle && showTitle" class="subtitle">{{ subtitle }}</p>
    
    <div class="districts-grid">
      <div v-for="(district, index) in districts" :key="index" class="district-card">
        <div class="card-header">
          <img :src="districtImages[index % districtImages.length]" :alt="district.name" class="district-image" />
          <div class="district-overlay"></div>
          <h3 class="district-name">{{ district.name }}</h3>
        </div>
        <div class="card-content">
          <div class="district-stats">
            <div class="stat">
              <span class="stat-label">Avg. price</span>
              <span class="stat-value">{{ district.price }} €/m²</span>
            </div>
            <div class="stat">
              <span class="stat-label">Properties</span>
              <span class="stat-value">{{ district.properties || Math.floor(Math.random() * 50) + 50 }}</span>
            </div>
          </div>
          <button class="view-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
            View Properties
          </button>
        </div>
      </div>
    </div>
    
    <div class="mt-6">
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
  showTitle: {
    type: Boolean,
    default: true
  },
  districts: {
    type: Array,
    default: () => [
      { name: 'Botanica', price: '950', properties: 87 },
      { name: 'Centru', price: '1150', properties: 124 },
      { name: 'Ciocana', price: '850', properties: 62 },
      { name: 'Rîșcani', price: '900', properties: 91 },
      { name: 'Buiucani', price: '920', properties: 78 }
    ]
  }
})

const districtImages = [
  'https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560748952-1d2d768c2337?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?q=80&w=1470&auto=format&fit=crop'
]
</script>

<style scoped>
.districts-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  text-align: center;
  color: var(--brand-blue, #3b65de);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: var(--text-gray, #4b5563);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.districts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.district-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.district-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  position: relative;
  height: 140px;
  overflow: hidden;
}

.district-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.district-card:hover .district-image {
  transform: scale(1.1);
}

.district-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));
  z-index: 1;
}

.district-name {
  position: absolute;
  bottom: 12px;
  left: 15px;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  z-index: 2;
  margin: 0;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.district-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.2rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a2a54;
}

.view-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--brand-blue, #3b65de);
  color: white;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: auto;
}

.view-button:hover {
  background-color: var(--brand-dark, #2a4bb9);
}

@media (max-width: 768px) {
  .districts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .districts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
