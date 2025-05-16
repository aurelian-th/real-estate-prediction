<template>
  <div class="slidev-layout website-style">
    <div class="website-header">
      <div class="header-container">
        <div class="logo">
          <div class="logo-icon">🏢</div>
          <span>Moldova Insight Realty</span>
        </div>
        <div class="nav-links">
          <span class="nav-item active">Properties</span>
          <span class="nav-item">Trends & Predictions</span>
          <div class="login-button">Login</div>
        </div>
      </div>
    </div>

    <div class="page-content">
      <div class="content-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.website-style {
  padding-top: 4rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
  min-height: 100%;
  height: 100%;
}

.page-content {
  min-height: calc(100% - 4rem);
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  height: 100%;
}

.website-header {
  background-color: var(--header-bg, #0b102a);
  color: white;
  padding: 0;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.website-header .logo {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.4rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item {
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;
  opacity: 0.9;
  transition: opacity 0.2s ease;
  font-size: 0.95rem;
}

.nav-item:hover {
  opacity: 1;
}

.nav-item.active {
  opacity: 1;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--brand-blue, #3b65de);
}

.login-button {
  background-color: var(--brand-blue, #3b65de);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.95rem;
}

.login-button:hover {
  background-color: var(--brand-dark, #2a4bb9);
}

.content-center {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .header-container {
    padding: 0.8rem 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
}
</style>
