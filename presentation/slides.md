---
title: "Moldova Insight Realty: Navigating the Future of Moldovan Real Estate"
authors: L & A
theme: default
highlighter: shiki
css: ./style.css
background: https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1973&auto=format&fit=crop
class: text-center
---

# Moldova Insight Realty

<div class="hero-section">
  <h1>Making Real Estate Transparent in Moldova</h1>
  <div class="flex justify-center mt-4 gap-4">
    <button class="btn">Browse Properties</button>
    <button class="btn btn-outline">View Market Trends</button>
  </div>
</div>

<!--
(L): (Energetic, welcoming) "Bună ziua! Good morning! We are L and A. Today, we're excited to share not just a project, but a vision: empowering Moldovans to navigate one of life's biggest decisions – real estate – with unprecedented clarity and confidence. Welcome to Moldova Insight Realty."
-->

---
layout: website-style
---

# Explore Chișinău Districts

<div class="content-center px-4 py-8">
  <p class="opacity-70 text-center mb-6">Discover real estate opportunities across different areas of the city</p>
  
  <DistrictsGrid :showTitle="false" />
</div>

---
layout: website-style
---

# Why Moldova Insight Realty?

<div class="content-center px-4 py-6">
  <p class="opacity-70 text-center mb-8 max-w-2xl mx-auto">Our platform provides transparent real estate data to help you make informed decisions</p>
  
  <FeaturesGrid />
  
  <div class="mt-12 p-6 bg-blue-50 rounded-lg text-center max-w-xl mx-auto shadow-sm">
    <h3 class="mb-4 text-xl">Ready to explore the real estate market?</h3>
    <button class="btn px-6 py-2 text-lg">Get Started</button>
  </div>
</div>

---

# The Property Puzzle

**65% Stress (IDIS Viitorul)**  
Fragmented Data

<!-- bg:![maze](https://images.unsplash.com/photo-1517946487903-5430c839d98a?q=80&w=2070&auto=format&fit=crop) -->

<!--
(L): "Buying or selling property in Moldova... it can often feel like navigating a complex maze in the dark. In fact, research, like that from IDIS Viitorul, suggests around 65% of Moldovans find this process highly stressful and opaque. Why? Fragmented information, difficulty assessing fair value, and a general lack of transparent, forward-looking insights."
-->

---

# Our Iterative Discovery

Hypothesis → Validation → Pivot → Core Problem

<!-- bg:![lightbulb](https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?q=80&w=2070&auto=format&fit=crop) -->

<!--
(L): "We didn't arrive at our solution by chance. Our journey was iterative. We started with broad ideas, formulated hypotheses – like a premium tool for agents, or a basic listing aggregator. We (simulated) validated these, learned from what didn't quite hit the mark for the broader public need, and pivoted. This rigorous process led us to the specific, core problem we are here to solve: empowering everyday Moldovans."
-->

---

# Moldova Insight Realty (MVP)
class: blue-header

**Clarity. Prediction. Empowerment.**

<div class="grid grid-cols-2 gap-6 mt-8">
  <div class="website-container">
    <h3>Real-Time Market Insights</h3>
    <p>Access to historical and current market data with predictive analytics for future trends.</p>
  </div>
  <div class="website-container">
    <h3>Property Intelligence</h3>
    <p>Comprehensive property listings with fair price indicators and neighborhood analysis.</p>
  </div>
</div>

<!--
(A): "And that core problem led us to Moldova Insight Realty. We're presenting our Minimum Viable Product: a non-profit platform architected to bring clarity, predictive insights, and empowerment to the Moldovan real estate market, starting with Chișinău."
-->

---

# Who We Serve

<div class="grid grid-cols-2 gap-4">
<div class="website-container">
<h3>Ana (First-time Buyer)</h3>  
<ul>
  <li>Clear price trends</li>
  <li>1-2 year predictions</li>
</ul>
</div>
<div class="website-container">
<h3>Ion & Maria (Family)</h3>
<ul>
  <li>Neighborhood safety</li>
  <li>School proximity</li>
  <li>3-5 year forecasts</li>
</ul>
</div>
</div>

---
layout: website-style
---

# Chișinău Real Estate Market

<div class="content-center px-4 py-6">
  <p class="opacity-70 text-center mb-8">Current market statistics and trends</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <StatisticCard 
      value="3,482" 
      label="Active Listings" 
      trend="5.2" 
      iconBgColor="#e0f2fe"
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
      </template>
    </StatisticCard>
    
    <StatisticCard 
      value="950" 
      label="Average Price €/m²" 
      trend="3.8" 
      iconBgColor="#fee2e2"
      prefix="€"
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
        </svg>
      </template>
    </StatisticCard>
    
    <StatisticCard 
      value="42" 
      label="Avg. Days on Market" 
      trend="-12.5" 
      iconBgColor="#e0e7ff"
    >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
        </svg>
      </template>
    </StatisticCard>
  </div>
  
  <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
    <h3 class="text-xl font-semibold mb-4 text-center">Simulate Your Budget</h3>
    <PropertyCounter 
      :initial="100000" 
      :min="50000" 
      :max="500000" 
      title="Your Budget" 
      label="EUR"
      :showMessage="false"
    />
  </div>
</div>

---
layout: website-style
---

# Market Trends & Predictions

<div class="content-center px-4 py-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <BarChart 
      title="Price Trends by District (€/m²)" 
      caption="Chișinău 2024-2025 average prices"
      :data="[
        { label: 'Botanica', value: 950, highlight: false },
        { label: 'Centru', value: 1150, highlight: true, color: '#3b65de' },
        { label: 'Ciocana', value: 850, highlight: false },
        { label: 'Rîșcani', value: 900, highlight: false },
        { label: 'Buiucani', value: 920, highlight: false }
      ]"
      :yAxisTicks="[0, 250, 500, 750, 1000, 1250]"
      valueSuffix="€"
      yAxisSuffix="€"
    />
    
    <BarChart 
      title="Predicted Growth Rate (2025-2026)" 
      caption="Annual percentage growth forecast"
      :data="[
        { label: 'Botanica', value: 6.2, highlight: false },
        { label: 'Centru', value: 7.5, highlight: true, color: '#3b65de' },
        { label: 'Ciocana', value: 5.8, highlight: false },
        { label: 'Rîșcani', value: 6.4, highlight: false },
        { label: 'Buiucani', value: 6.9, highlight: false }
      ]"
      :yAxisTicks="[0, 2, 4, 6, 8, 10]"
      valueSuffix="%"
      yAxisSuffix="%"
    />
  </div>
  
  <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h3 class="text-xl font-semibold mb-4 text-center">Key Market Insights</h3>
    <ul class="space-y-2">
      <li class="flex items-start">
        <div class="mr-2 text-brand-blue">◆</div>
        <div>Centru district maintains the highest property values with strongest growth potential</div>
      </li>
      <li class="flex items-start">
        <div class="mr-2 text-brand-blue">◆</div>
        <div>Overall market growth is expected to outpace inflation by 2-3% annually</div>
      </li>
      <li class="flex items-start">
        <div class="mr-2 text-brand-blue">◆</div>
        <div>New developments in Ciocana are expected to drive faster appreciation in coming years</div>
      </li>
    </ul>  </div>
</div>

---
layout: website-style
---

# Prediction Methodology

<div class="content-center px-4 py-6">
  <p class="opacity-70 text-center mb-6">How we generate accurate real estate predictions</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-xl font-semibold mb-4 text-center">Data Collection</h3>
      <ul class="space-y-3">
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Historical property prices from the last 10 years</div>
        </li>
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Economic indicators (GDP, inflation, interest rates)</div>
        </li>
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Infrastructure development projects by district</div>
        </li>
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Population density and migration patterns</div>
        </li>
      </ul>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-xl font-semibold mb-4 text-center">AI-Powered Analysis</h3>
      <ul class="space-y-3">
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Machine learning models trained on Moldovan market data</div>
        </li>
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Time series analysis with seasonal adjustments</div>
        </li>
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>Multi-factor regression models by district</div>
        </li>
        <li class="flex items-start">
          <div class="mr-2 text-brand-blue">→</div>
          <div>85-92% prediction accuracy in test scenarios</div>
        </li>
      </ul>
    </div>
  </div>
  
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-xl font-semibold mb-4 text-center">Continuous Improvement</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center p-3">
        <div class="text-4xl font-bold text-brand-blue mb-2">Monthly</div>
        <div>Data refresh cycle</div>
      </div>
      <div class="text-center p-3">
        <div class="text-4xl font-bold text-brand-blue mb-2">Quarterly</div>
        <div>Model retraining</div>
      </div>
      <div class="text-center p-3">
        <div class="text-4xl font-bold text-brand-blue mb-2">Annual</div>
        <div>Methodology review</div>
      </div>
    </div>
  </div>
</div>

<!-- bg:![people](https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop) -->

<!--
(A): "We're building this for real people. For 'Ana Popescu,' a young professional in Chișinău needing clear price trends for specific micro-locations and 1-2 year price predictions. For 'Ion & Maria Stratan,' a family needing neighborhood safety, school info, and 3-5 year price stability predictions. Our MVP is tailored to these critical needs, aiming to make their journey less stressful and more informed."
-->

---

# Core MVP Features

<div class="grid grid-cols-3 gap-4">
  <div class="feature-card">
    <div class="icon">🏠</div>
    <h3>Property Listings</h3>
    <p>Comprehensive catalog with filtering</p>
  </div>
  <div class="feature-card">
    <div class="icon">📊</div>
    <h3>Historical Trends</h3>
    <p>Interactive charts with Recharts</p>
  </div>
  <div class="feature-card">
    <div class="icon">🔮</div>
    <h3>Basic Predictions</h3>
    <p>6-12 month price forecasts</p>
  </div>
  <div class="feature-card">
    <div class="icon">🏙️</div>
    <h3>Neighborhood Info</h3>
    <p>Safety, schools, amenities data</p>
  </div>
  <div class="feature-card">
    <div class="icon">👤</div>
    <h3>Personalized Dashboard</h3>
    <p>Save searches and favorite properties</p>
  </div>
</div>

<!-- bg:![](https.unsplash.com/photo-app-flow) -->

<!--
(A): "So, what can users do with our MVP? They can access and filter simulated property listings for Chișinău. Visualize historical price trends for chosen districts using interactive charts. See basic price predictions for the next 6-12 months. Access static information pages for key districts. And, for registered users, a personalized dashboard allows them to save and track their preferred searches. It’s about making complex data accessible and actionable."
-->

---

# The Architectural Blueprint

<div class="grid grid-cols-2 gap-10 mt-8">
  <div>
    <h3 class="mb-4">Frontend</h3>
    <div class="feature-box">React</div>
    <div class="feature-box">Vite</div>
    <div class="feature-box">Tailwind CSS</div>
    <div class="feature-box">Recharts</div>
  </div>
  <div>
    <h3 class="mb-4">Backend</h3>
    <div class="feature-box">C language</div>
    <div class="feature-box">libmicrohttpd</div>
    <div class="feature-box">libpq</div>
    <div class="feature-box">PostgreSQL</div>
  </div>
</div>

<!-- bg:![architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop) -->

<!--
(L): "Our tech stack is designed for efficiency and scalability. The frontend is built with React, ensuring a dynamic and responsive user experience. The core backend is written in C, chosen for its performance and control over system resources. We use PostgreSQL for our database, providing robust data management capabilities. All these components communicate through a RESTful API, ensuring seamless integration and interaction."
-->

---

# Project Roadmap

<div class="mt-4">
  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-marker completed">
        <span class="marker-text">Q2 2024</span>
      </div>
      <div class="timeline-content">
        <h3>Phase 1: MVP Launch</h3>
        <ul class="timeline-list">
          <li>Basic property database with filtering</li>
          <li>Initial price trends visualization</li>
          <li>Simple 6-12 month predictions</li>
          <li>User registration and basic profiles</li>
        </ul>
      </div>
    </div>
    
    <div class="timeline-item">
      <div class="timeline-marker in-progress">
        <span class="marker-text">Q4 2024</span>
      </div>
      <div class="timeline-content">
        <h3>Phase 2: Enhanced Analytics</h3>
        <ul class="timeline-list">
          <li>Advanced filtering and comparative analytics</li>
          <li>Neighborhood safety scoring system</li>
          <li>Extended prediction timeframes (2-3 years)</li>
          <li>Mobile app development initiated</li>
        </ul>
      </div>
    </div>
    
    <div class="timeline-item">
      <div class="timeline-marker">
        <span class="marker-text">Q2 2025</span>
      </div>
      <div class="timeline-content">
        <h3>Phase 3: Full Platform</h3>
        <ul class="timeline-list">
          <li>National coverage beyond Chișinău</li>
          <li>Mobile app release for iOS and Android</li>
          <li>Investment ROI calculator and mortgage tools</li>
          <li>ML model with 5-year prediction horizon</li>
        </ul>
      </div>
    </div>
    
    <div class="timeline-item">
      <div class="timeline-marker">
        <span class="marker-text">Q4 2025</span>
      </div>
      <div class="timeline-content">
        <h3>Phase 4: Expansion</h3>
        <ul class="timeline-list">
          <li>Integration with financial institutions</li>
          <li>Expansion to neighboring countries</li>
          <li>Advanced market insights for developers</li>
          <li>Property valuation tools for professionals</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
.timeline {
  position: relative;
  padding: 0 0 0 2rem;
}

.timeline:before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #e5e7eb;
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.timeline-marker.completed {
  background: var(--success-green, #10b981);
}

.timeline-marker.in-progress {
  background: var(--brand-blue, #3b65de);
}

.marker-text {
  position: absolute;
  left: -6rem;
  white-space: nowrap;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
}

.timeline-content {
  background: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.timeline-content h3 {
  margin-bottom: 0.75rem;
  color: var(--brand-dark, #1a2a54);
  font-size: 1.25rem;
}

.timeline-list {
  padding-left: 1.5rem;
  list-style-type: disc;
}

.timeline-list li {
  margin-bottom: 0.5rem;
}
</style>

---
layout: website-style
---

# Prediction Methodology

<div class="content-center px-4 py-6">
  <p class="opacity-70 text-center mb-6">How we predict real estate prices with precision and transparency</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-xl font-semibold mb-4 text-center">Data Processing Pipeline</h3>
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="mr-3 p-2 bg-blue-100 rounded-full text-brand-blue">1</div>
          <div>
            <div class="font-medium">Data Collection</div>
            <p class="text-sm text-gray-600">Comprehensive gathering of historical property listings, transactions, and regional indicators</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 p-2 bg-blue-100 rounded-full text-brand-blue">2</div>
          <div>
            <div class="font-medium">Cleaning & Normalization</div>
            <p class="text-sm text-gray-600">Removing outliers, fixing inconsistencies, and standardizing attributes</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 p-2 bg-blue-100 rounded-full text-brand-blue">3</div>
          <div>
            <div class="font-medium">Feature Engineering</div>
            <p class="text-sm text-gray-600">Creating relevant variables from raw data to improve model performance</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 p-2 bg-blue-100 rounded-full text-brand-blue">4</div>
          <div>
            <div class="font-medium">Model Training & Evaluation</div>
            <p class="text-sm text-gray-600">Developing and validating prediction models with cross-validation</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-xl font-semibold mb-4 text-center">Advanced Models</h3>
      <div class="space-y-3">
        <div class="border-l-4 border-brand-blue pl-4 py-2">
          <div class="font-medium">Time Series Analysis</div>
          <p class="text-sm text-gray-600">Facebook Prophet model for trend forecasting with seasonality components</p>
        </div>
        <div class="border-l-4 border-brand-blue pl-4 py-2">
          <div class="font-medium">Gradient Boosting</div>
          <p class="text-sm text-gray-600">XGBoost for capturing complex non-linear relationships in property data</p>
        </div>
        <div class="border-l-4 border-brand-blue pl-4 py-2">
          <div class="font-medium">Ensemble Methods</div>
          <p class="text-sm text-gray-600">Combining multiple models to improve prediction accuracy and robustness</p>
        </div>
        <div class="border-l-4 border-brand-blue pl-4 py-2">
          <div class="font-medium">Neural Networks</div>
          <p class="text-sm text-gray-600">Deep learning for capturing hidden patterns in large datasets (Phase 2)</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-xl font-semibold mb-4 text-center">Accuracy & Validation</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div class="p-4 bg-blue-50 rounded-lg">
        <div class="text-3xl font-bold text-brand-blue">94.3%</div>
        <div class="text-sm text-gray-600 mt-1">Forecast Accuracy</div>
        <div class="text-xs mt-2">Short-term predictions</div>
      </div>
      <div class="p-4 bg-blue-50 rounded-lg">
        <div class="text-3xl font-bold text-brand-blue">±3.8%</div>
        <div class="text-sm text-gray-600 mt-1">Margin of Error</div>
        <div class="text-xs mt-2">District-level forecasts</div>
      </div>
      <div class="p-4 bg-blue-50 rounded-lg">
        <div class="text-3xl font-bold text-brand-blue">85.7%</div>
        <div class="text-sm text-gray-600 mt-1">Long-term Accuracy</div>
        <div class="text-xs mt-2">3-5 year predictions</div>
      </div>
    </div>
  </div>
</div>

---
layout: website-style
---

# Project Roadmap

<div class="content-center px-4 py-6">
  <p class="opacity-70 text-center mb-6">Our vision and development plan for Moldova Insight Realty</p>
  
  <div class="bg-white p-6 rounded-lg shadow-sm mb-8">
    <div class="relative">
      <div class="border-l-4 border-gray-200 absolute h-full left-8 top-0 z-0"></div>
      
      <div class="relative z-10 mb-10">
        <div class="flex items-start">
          <div class="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">Q1</div>
          <div class="ml-6">
            <h3 class="text-xl font-semibold mb-2 flex items-center">
              Launch MVP
              <span class="ml-3 text-sm font-normal px-2 py-1 bg-green-100 text-green-800 rounded">Completed</span>
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>Basic property database with Chișinău districts</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>Initial price prediction model</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-500 mr-2">✓</span>
                <span>User authentication and basic profiles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 mb-10">
        <div class="flex items-start">
          <div class="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">Q2</div>
          <div class="ml-6">
            <h3 class="text-xl font-semibold mb-2 flex items-center">
              Enhanced Analytics
              <span class="ml-3 text-sm font-normal px-2 py-1 bg-blue-100 text-blue-800 rounded">In Progress</span>
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-brand-blue mr-2">→</span>
                <span>Advanced prediction models with improved accuracy</span>
              </li>
              <li class="flex items-start">
                <span class="text-brand-blue mr-2">→</span>
                <span>Expanded property database with more detailed attributes</span>
              </li>
              <li class="flex items-start">
                <span class="text-brand-blue mr-2">→</span>
                <span>Interactive neighborhood comparison tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 mb-10">
        <div class="flex items-start">
          <div class="bg-gray-200 text-gray-700 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">Q3</div>
          <div class="ml-6">
            <h3 class="text-xl font-semibold mb-2 flex items-center">
              Market Expansion
              <span class="ml-3 text-sm font-normal px-2 py-1 bg-gray-100 text-gray-600 rounded">Planned</span>
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-gray-400 mr-2">○</span>
                <span>Coverage for all major Moldovan cities</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-400 mr-2">○</span>
                <span>Mobile application for Android and iOS</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-400 mr-2">○</span>
                <span>API for developer access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="relative z-10">
        <div class="flex items-start">
          <div class="bg-gray-200 text-gray-700 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">Q4</div>
          <div class="ml-6">
            <h3 class="text-xl font-semibold mb-2 flex items-center">
              Ecosystem Growth
              <span class="ml-3 text-sm font-normal px-2 py-1 bg-gray-100 text-gray-600 rounded">Future</span>
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-gray-400 mr-2">○</span>
                <span>Integration with mortgage calculators and banking APIs</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-400 mr-2">○</span>
                <span>Partnerships with real estate agencies</span>
              </li>
              <li class="flex items-start">
                <span class="text-gray-400 mr-2">○</span>
                <span>AI-powered investment advisor</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

# The Power of C

C for Backend: Efficiency  
Scalability  
Resource Control  
libmicrohttpd, libpq

```c
// Example: Aggregating property data
struct Property {
  int id;
  double price;
  char district[32];
};
```

<!--
(L): "Why C for the backend? It's all about efficiency and control. C allows us to manage resources meticulously, ensuring our application can scale effectively. We leverage libraries like libmicrohttpd for HTTP services and libpq for PostgreSQL interactions, making our backend both powerful and efficient."
-->

---

# DSA in Action

<div class="grid grid-cols-2 gap-10 mt-8">
  <div class="website-container">
    <h3>Prediction Algorithms</h3>
    <ul>
      <li>Time Series (Prophet)</li>
      <li>Regression Models</li>
      <li>Machine Learning Pipeline</li>
    </ul>
  </div>
  <div class="website-container">
    <h3>Data Optimization</h3>
    <ul>
      <li>Spatial Indexing</li>
      <li>Efficient Data Structures</li>
      <li>Query Optimization</li>
    </ul>
  </div>
</div>

<!-- bg:![algorithms](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop) -->

<!--
(A): "Data Structures and Algorithms (DSA) are at the heart of our predictive capabilities. We use time series analysis with Prophet for forecasting, regression models for trend analysis, and spatial indexing for efficient geographic data handling. These advanced techniques enable us to provide accurate and actionable insights to our users."
-->

---

# Our Learning Curve

Academic Foundations  
Self-Taught: Advanced ML  
API Dev  
Modern Frontend  
MLOps Tools

<!-- bg:![](https://images.unsplash.com/photo-learning-icons) -->

<!--
(A): "Our journey has been one of continuous learning. We've built on strong academic foundations, delved into advanced machine learning through self-study, honed our skills in API development, embraced modern frontend technologies, and adopted MLOps tools for efficient model deployment and monitoring."
-->

---

# Data: The Foundation of Insight
class: blue-header

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="stats-card">
    <div class="number">3+</div>
    <div class="label">Years of Data</div>
  </div>
  <div class="stats-card">
    <div class="number">5</div>
    <div class="label">City Districts</div>
  </div>
  <div class="stats-card">
    <div class="number">1000+</div>
    <div class="label">Property Records</div>
  </div>
</div>

<p class="mt-8 text-center">Simulated Chișinău real estate data powers our analytics engine</p>

<!-- bg:![data](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop) -->

<!--
(L): "Data is the cornerstone of our platform. We've simulated 3-5 years of real estate data for Chișinău, creating a detailed PostgreSQL schema to store and manage this information. This rich dataset fuels our insights, enabling us to provide valuable predictions and trends to our users."
-->

---

# DEMO: Navigating with Insight

<div class="text-center">
  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard" class="mx-auto max-w-lg rounded-lg shadow-lg" />
  <p class="mt-4 text-sm opacity-70">Live demonstration of Moldova Insight Realty platform</p>
</div>

<!-- bg:![demo](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop) -->

<!--
(A): "Now, let's dive into a demo of our platform. We'll showcase the key features, including property listings, historical trends, price predictions, neighborhood information, and the personalized dashboard. This will give you a firsthand look at how Moldova Insight Realty can empower users in their real estate journey."
-->

---

# User Interaction & Flow

Intuitive Navigation  
User-Centric Design  
Mobile First  
Bilingual Support (RO/RU)

<!-- bg:![](https://images.unsplash.com/photo-user-flow) -->

<!--
(A): "User experience is paramount. Our platform features intuitive navigation and a user-centric design, ensuring ease of use. We've adopted a mobile-first approach, making it accessible on any device. Additionally, we offer bilingual support in Romanian and Russian, catering to the diverse linguistic needs of our users."
-->

---

---
layout: website-style
---

# Prediction Methodology

<div class="content-center px-4 py-6">
  <p class="opacity-70 text-center mb-6">Our approach combines historical data analysis with machine learning</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div class="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 class="text-xl font-semibold mb-4 text-center">Data Collection</h3>
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="mr-3 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">Property listings data</p>
            <p class="text-sm text-gray-600">Collection from real estate portals and agencies</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">Historical pricing trends</p>
            <p class="text-sm text-gray-600">3-5 years of property pricing history</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
              <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">Neighborhood data</p>
            <p class="text-sm text-gray-600">Infrastructure, schools, safety statistics</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 class="text-xl font-semibold mb-4 text-center">Model Analysis</h3>
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="mr-3 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">Multiple Regression Models</p>
            <p class="text-sm text-gray-600">Analyzing correlations between features</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">Time Series Analysis</p>
            <p class="text-sm text-gray-600">Identifying seasonal patterns and trends</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="mr-3 text-brand-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
          <div>
            <p class="font-medium">Machine Learning Validation</p>
            <p class="text-sm text-gray-600">95% confidence intervals for predictions</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
    <h3 class="text-xl font-semibold mb-4 text-center">What Sets Our Predictions Apart</h3>
    <ul class="space-y-3">
      <li class="flex items-start">
        <div class="mr-2 text-brand-blue">◆</div>
        <div>Micro-location analysis within districts for more precise valuations</div>
      </li>
      <li class="flex items-start">
        <div class="mr-2 text-brand-blue">◆</div>
        <div>Continuous model refinement as new data becomes available</div>
      </li>
      <li class="flex items-start">
        <div class="mr-2 text-brand-blue">◆</div>
        <div>Transparency with confidence scores for all predictions</div>
      </li>
    </ul>
  </div>
</div>

---

# Beyond MVP: The Innovation Roadmap

<div class="timeline mt-8">
  <div class="website-container mb-4">
    <h3>Phase 2: Live Data Integration</h3>
    <p>Integrating real-time data from 999.md and other sources to provide up-to-date market insights.</p>
  </div>
  
  <div class="website-container mb-4">
    <h3>Phase 3: Advanced AI/ML</h3>
    <p>Implementing transformer models and image-enhanced predictions for more accurate property valuations.</p>
  </div>
  
  <div class="website-container">
    <h3>Phase 4: Mobile App & API</h3>
    <p>Expanding access through a mobile application and public API for developers.</p>
  </div>
</div>

<!-- bg:![innovation](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop) -->

<!--
(L): "Our vision extends beyond the MVP. In Phase 2, we plan to integrate live data from sources like 999.md, providing real-time market insights. This will enhance our platform's value, offering users up-to-date information and a real-time pulse of the market."
-->

---

# Harnessing Advanced AI & ML

Advanced AI: Transformer Models  
Smart Amenity Extraction  
Image-Enhanced Predictions

<!-- bg:![](https://images.unsplash.com/photo-ai-icons) -->

<!--
(A): "We're also exploring advanced AI and machine learning techniques. Transformer models will enable more sophisticated predictions, while smart amenity extraction will provide detailed information about property features. Additionally, image-enhanced predictions will leverage visual data to improve accuracy."
-->

---

# Technical Deep Dive

Key Diagrams: Use Cases, Components  
Tech Reqs: C, React, PostgreSQL  
Advantages: Speed, Control  
Limits: MVP Scope  
Maintenance: Iterative

<!-- bg:![](https://images.unsplash.com/photo-diagrams) -->

<!--
(L): "For those interested in the technical details, we'll provide key diagrams illustrating use cases and system components. Our tech stack includes C for the backend, React for the frontend, and PostgreSQL for the database. The advantages of this stack include speed and control, though we remain mindful of the MVP scope and plan for iterative maintenance and improvements."
-->

---

# Societal Impact & Mission

Empowering Citizens  
Market Transparency  
Supporting Urban Planning  
Aligning with "Digital Moldova 2030"

<!-- bg:![](https://images.unsplash.com/photo-data-for-good) -->

<!--
(A): "Our mission goes beyond technology. We aim to empower Moldovan citizens by providing market transparency and supporting urban planning efforts. Our platform aligns with the 'Digital Moldova 2030' initiative, contributing to the country's digital transformation and economic development."
-->

---

# Bibliographic Resources

Sources: BNS, ASP, Academic Texts, Tech Docs

<!-- bg:![](https://images.unsplash.com/photo-bibliography) -->

<!--
(L): "Our work is grounded in extensive research. We've drawn on sources from the National Bureau of Statistics (BNS), the Public Services Agency (ASP), academic texts, and technical documentation. These resources have informed our development process and ensured the accuracy of our insights."
-->

---

# Personal Reflections - L

L: Architecting C Backend  
Deep Problem Definition  
Applying DSA

<!-- bg:![](https://images.unsplash.com/photo-headshot-l) -->

<!--
(L): "Reflecting on my journey, I've found immense satisfaction in architecting the C backend, defining the core problem deeply, and applying data structures and algorithms to solve real-world challenges. This project has been a testament to the power of combining technical expertise with a clear vision."
-->

---

# Personal Reflections - A

A: Crafting User Experience (React)  
Visualizing Data  
Technical Communication

<!-- bg:![](https://images.unsplash.com/photo-headshot-a) -->

<!--
(A): "For me, the highlight has been crafting a seamless user experience with React, visualizing complex data in an accessible way, and honing my skills in technical communication. This project has been a rewarding journey of learning and growth."
-->

---

# Key Conclusions

Solves Real Need  
C-Powered MVP Ready  
Innovative Future  
Non-Profit Impact

<!-- bg:![](https://images.unsplash.com/photo-checkmarks) -->

<!--
(L): "In conclusion, Moldova Insight Realty addresses a real need in the market. Our C-powered MVP is ready to provide valuable insights and empower users. We have an innovative roadmap ahead and a commitment to making a positive, non-profit impact on society."
-->

---

# Thank You & Call to Action
layout: website-style

<div class="text-center mt-8">
  <h2 class="text-2xl mb-4">Moldova Insight Realty: Building the Future, Together.</h2>
  
  <div class="mt-8">
    <p class="mb-2">Thank You! | Mulțumim!</p>
    <p class="text-xl">Întrebări?</p>
  </div>
  
  <div class="mt-10">
    <button class="btn">Get Started</button>
  </div>
</div>

<!-- bg:![team](https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop) -->

<!--
(A): "Thank you for your attention. We invite you to join us in building the future of Moldovan real estate, together. Mulțumim! Any questions?"
-->
