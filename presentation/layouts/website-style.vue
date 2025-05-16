<template>
  <div class="slidev-layout website-style">
    <div class="website-header">
      <div class="logo">Moldova Insight Realty</div>
      <div class="nav-links">
        <span>Properties</span>
        <span>Trends & Predictions</span>
        <span>Login</span>
      </div>
    </div>

    <div class="content-container">
      <slot />
    </div>
  </div>
</template>

<style>
.website-style {
  padding-top: 4rem;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.website-header {
  background-color: var(--header-bg);
  color: white;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.website-header .logo {
  color: white;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links span {
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.9;
}

.nav-links span:hover {
  opacity: 1;
}
</style>
