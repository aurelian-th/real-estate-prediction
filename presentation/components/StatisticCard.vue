<template>
  <div class="statistic-card" :class="{ 'animate': animate }">
    <div class="card-icon" :style="{ backgroundColor: iconBgColor }">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
      </slot>
    </div>
    <div class="card-content">
      <div class="stat-value">{{ formatValue(value) }}</div>
      <div class="stat-label">{{ label }}</div>
      <div class="stat-trend" v-if="showTrend">
        <div class="trend-indicator" :class="trendClasses">
          <svg v-if="trend > 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
          </svg>
          <svg v-else-if="trend < 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
          <span>{{ formatTrend(trend) }}</span>
        </div>
        <div class="trend-period">{{ trendPeriod }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  trend: {
    type: Number,
    default: null
  },
  trendPeriod: {
    type: String,
    default: 'vs last month'
  },
  showTrend: {
    type: Boolean,
    default: true
  },
  iconBgColor: {
    type: String,
    default: '#e0e7ff'  // Light indigo
  },
  animate: {
    type: Boolean,
    default: true
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  }
})

const trendClasses = computed(() => {
  if (props.trend > 0) {
    return 'positive'
  } else if (props.trend < 0) {
    return 'negative'
  } else {
    return 'neutral'
  }
})

function formatValue(val) {
  const numValue = Number(val)
  if (isNaN(numValue)) {
    return props.prefix + val + props.suffix
  }
  
  if (numValue >= 1000) {
    return props.prefix + (numValue / 1000).toFixed(1) + 'k' + props.suffix
  }
  
  return props.prefix + numValue + props.suffix
}

function formatTrend(val) {
  const prefix = val > 0 ? '+' : ''
  return `${prefix}${val}%`
}
</script>

<style scoped>
.statistic-card {
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.statistic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.statistic-card.animate::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  to {
    left: 100%;
  }
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  color: var(--brand-blue, #3b65de);
  flex-shrink: 0;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a2a54;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.stat-trend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
}

.trend-indicator.positive {
  color: #10b981; /* green */
}

.trend-indicator.negative {
  color: #ef4444; /* red */
}

.trend-indicator.neutral {
  color: #9ca3af; /* gray */
}

.trend-period {
  font-size: 0.8rem;
  color: #9ca3af;
}
</style>
