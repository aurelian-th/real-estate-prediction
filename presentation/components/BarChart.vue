<template>
  <div class="bar-chart-container">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    
    <div class="chart-area">
      <div class="y-axis">
        <div v-for="tick in yAxisTicks" :key="tick" class="y-axis-tick">
          <span class="tick-label">{{ tick }}{{ yAxisSuffix }}</span>
          <div class="tick-line"></div>
        </div>
      </div>
      
      <div class="bars-container">
        <div v-for="(item, i) in data" :key="i" class="bar-column">
          <div class="value-label" :class="{ 'highlight': item.highlight }">
            {{ item.value }}{{ valueSuffix }}
          </div>
          <div 
            class="bar" 
            :class="{ 'highlight': item.highlight }"
            :style="{ 
              height: `${calculateBarHeight(item.value)}%`,
              backgroundColor: item.color || null
            }"
          >
            <div class="bar-glow"></div>
          </div>
          <div class="label" :class="{ 'highlight': item.highlight }">{{ item.label }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="caption" class="chart-caption">{{ caption }}</div>
    
    <div v-if="showLegend && legendItems.length > 0" class="chart-legend">
      <div v-for="(legend, i) in legendItems" :key="i" class="legend-item">
        <div class="legend-color" :style="{ backgroundColor: legend.color }"></div>
        <div class="legend-label">{{ legend.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  yAxisMax: {
    type: Number,
    default: null
  },
  yAxisTicks: {
    type: Array,
    default: () => [0, 25, 50, 75, 100]
  },
  showLegend: {
    type: Boolean,
    default: false
  },
  legendItems: {
    type: Array,
    default: () => []
  },
  valueSuffix: {
    type: String,
    default: '%'
  },
  yAxisSuffix: {
    type: String,
    default: ''
  }
})

const maxValue = computed(() => {
  if (props.yAxisMax !== null) {
    return props.yAxisMax
  }
  return Math.max(...props.data.map(item => item.value), 100)
})

function calculateBarHeight(value) {
  return (value / maxValue.value) * 100
}
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow, 0 4px 12px rgba(0, 0, 0, 0.05));
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--brand-dark, #1a2a54);
  margin-bottom: 1.5rem;
  text-align: center;
}

.chart-area {
  display: flex;
  height: 280px;
  position: relative;
  margin-bottom: 1.5rem;
}

.y-axis {
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 30px;
}

.y-axis-tick {
  display: flex;
  align-items: center;
  position: relative;
  height: 0;
}

.tick-label {
  font-size: 0.75rem;
  color: #9ca3af;
  width: 30px;
  text-align: right;
  padding-right: 8px;
}

.tick-line {
  position: absolute;
  height: 1px;
  background-color: rgba(229, 231, 235, 0.7);
  left: 35px;
  right: -20px;
  width: calc(100vw - 80px);
  max-width: 800px;
}

.bars-container {
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  padding-bottom: 30px;
  height: 100%;
  gap: 5px;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  position: relative;
  height: 100%;
  justify-content: flex-end;
}

.value-label {
  position: absolute;
  top: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.bar-column:hover .value-label {
  opacity: 1;
  transform: translateY(0);
}

.value-label.highlight {
  color: var(--brand-blue, #3b65de);
  opacity: 1;
}

.bar {
  width: 80%;
  max-width: 40px;
  background-color: #e0e7ff;
  border-radius: 6px 6px 0 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-out;
}

.bar-column:hover .bar {
  background-color: var(--brand-blue, #3b65de);
}

.bar.highlight {
  background-color: var(--brand-blue, #3b65de);
  box-shadow: 0 0 15px rgba(59, 101, 222, 0.3);
}

.bar-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0));
}

.label {
  margin-top: 8px;
  font-size: 0.8rem;
  color: #6b7280;
  text-align: center;
  transition: color 0.3s ease;
}

.bar-column:hover .label {
  color: var(--brand-dark, #1a2a54);
}

.label.highlight {
  color: var(--brand-dark, #1a2a54);
  font-weight: 500;
}

.chart-caption {
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 1rem;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: #e0e7ff;
}

.legend-label {
  font-size: 0.85rem;
  color: #4b5563;
}

/* Animation for bars on initial load */
@keyframes growUp {
  from { height: 0; }
  to { height: var(--final-height); }
}

.bar {
  animation: growUp 1s ease-out forwards;
  --final-height: v-bind('calculateBarHeight(item.value) + "%"');
}
</style>
